<?php
// Script to remove PHP comments (including docblocks) and HTML comments from .php files under app-php/
// It writes a .bak backup for each file before overwriting.

$root = __DIR__ . '/../app-php';
if (!is_dir($root)) {
    fwrite(STDERR, "Directory not found: $root\n");
    exit(1);
}

$it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root));
$files = new RegexIterator($it, '/^.+\.php$/i', RecursiveRegexIterator::GET_MATCH);

$modified = [];

foreach ($files as $match) {
    $file = $match[0];
    if (!is_file($file) || !is_readable($file)) continue;
    $original = file_get_contents($file);
    if ($original === false) continue;

    $tokens = token_get_all($original);
    $out = '';

    foreach ($tokens as $token) {
        if (is_array($token)) {
            $id = $token[0];
            $text = $token[1];
            // Skip PHP comments and doc comments
            if ($id === T_COMMENT || $id === T_DOC_COMMENT) {
                // drop
                continue;
            }
            // Keep everything else
            $out .= $text;
        } else {
            // single-char tokens like ; ?> etc
            $out .= $token;
        }
    }

    // Remove HTML comments from any inline HTML outside PHP tags
    // This will remove all <!-- ... --> blocks (non-greedy, across lines)
    $out = preg_replace('/<!--(.*?)-->/s', '', $out);

    // Normalize line endings to original ending style (preserve as-is)

    if ($out !== $original) {
        // backup original
        $bak = $file . '.bak';
        if (!file_exists($bak)) {
            file_put_contents($bak, $original);
        }
        file_put_contents($file, $out);
        $modified[] = $file;
    }
}

if (empty($modified)) {
    echo "No PHP files were changed.\n";
    exit(0);
}

echo "Modified files:\n" . implode("\n", $modified) . "\n";
exit(0);

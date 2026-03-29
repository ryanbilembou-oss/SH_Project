#!/usr/bin/env python3
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / 'app-php'
if not ROOT.exists():
    print(f"Directory not found: {ROOT}", file=sys.stderr)
    sys.exit(1)

php_file_paths = [p for p in ROOT.rglob('*.php') if p.is_file()]
modified = []


def strip_comments_from_php_text(s: str) -> str:
    out = []
    i = 0
    n = len(s)
    mode = 'html'  # 'html' or 'php'

    while i < n:
        if mode == 'html':
            if s.startswith('<?', i):
                # enter php mode, copy the tag
                # handle <?php, <?, <?=
                j = i
                while j < n and s[j] != '>':
                    if s[j] == '<' and s.startswith('<?', j):
                        # copy until end of tag start and break
                        break
                    j += 1
                # simpler: copy '<?' then continue in php mode
                out.append(s[i:i+2])
                i += 2
                mode = 'php'
                continue
            elif s.startswith('<!--', i):
                # remove until -->
                j = s.find('-->', i+4)
                if j == -1:
                    # drop rest
                    i = n
                else:
                    i = j + 3
                continue
            else:
                out.append(s[i])
                i += 1
                continue
        else:  # php mode
            if s.startswith('?>', i):
                out.append('?>')
                i += 2
                mode = 'html'
                continue

            ch = s[i]
            # Strings: keep intact (handle escapes)
            if ch == '"' or ch == "'":
                quote = ch
                out.append(ch)
                i += 1
                while i < n:
                    if s[i] == '\\':
                        # escape next char
                        if i + 1 < n:
                            out.append(s[i:i+2])
                            i += 2
                        else:
                            out.append(s[i])
                            i += 1
                    elif s[i] == quote:
                        out.append(s[i])
                        i += 1
                        break
                    else:
                        out.append(s[i])
                        i += 1
                continue

            # heredoc / nowdoc
            if s.startswith('<<<', i):
                m = re.match(r'<<<\s*(?:\'|\")?([A-Za-z_][A-Za-z0-9_]*)', s[i:])
                if m:
                    label = m.group(1)
                    # find end of heredoc: a line with label optionally followed by ;
                    # search from i forward
                    pattern = re.compile(r"\n" + re.escape(label) + r";?\r?\n")
                    mm = pattern.search(s, i)
                    if mm:
                        endpos = mm.end()
                        # copy the whole heredoc (from current i until endpos)
                        out.append(s[i:endpos])
                        i = endpos
                        continue
                    else:
                        # no end found: copy rest and break
                        out.append(s[i:])
                        i = n
                        break
                # if not matched, fallthrough to normal

            # single-line comment // or #
            if s.startswith('//', i) or s.startswith('#', i):
                # skip to end of line
                j = s.find('\n', i)
                if j == -1:
                    i = n
                else:
                    i = j
                continue

            # multi-line comment /* ... */ including docblocks
            if s.startswith('/*', i):
                j = s.find('*/', i+2)
                if j == -1:
                    i = n
                else:
                    i = j + 2
                continue

            # otherwise copy single char
            out.append(ch)
            i += 1
            continue

    return ''.join(out)


for path in php_file_paths:
    try:
        text = path.read_text(encoding='utf-8')
    except Exception:
        # try default encoding
        text = path.read_text()

    new_text = strip_comments_from_php_text(text)

    if new_text != text:
        bak = path.with_suffix(path.suffix + '.bak')
        if not bak.exists():
            bak.write_text(text, encoding='utf-8')
        path.write_text(new_text, encoding='utf-8')
        modified.append(str(path))

if not modified:
    print('No PHP files were changed.')
    sys.exit(0)

print('Modified files:')
for m in modified:
    print(m)

sys.exit(0)

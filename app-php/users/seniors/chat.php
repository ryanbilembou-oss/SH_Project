<?php
require_once __DIR__ . '/db.php';
session_start();

$id_user = $_SESSION['id_user'] ?? 6;

try {
    $pdo = getPDO();
    $stmtS = $pdo->prepare("SELECT prenom, nom FROM profile_senior WHERE id_user = ?");
    $stmtS->execute([$id_user]);
    $sData = $stmtS->fetch();

    $senior = [
        'prenom' => $sData['prenom'] ?? 'Madeleine',
        'nom' => $sData['nom'] ?? 'Fontaine',
        'avatar_initiales' => strtoupper(substr($sData['prenom'] ?? 'M', 0, 1) . substr($sData['nom'] ?? 'F', 0, 1))
    ];
} catch (Exception $e) {
    die("Erreur base : " . $e->getMessage());
}

$current_year = date('Y');
?>
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Messagerie – Silver Happy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="icon" href="img/logo-clear.png">
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            font-family: 'Fira Sans Condensed', sans-serif;
            height: 100vh;
            overflow: hidden;
        }


        .nav-link {
            position: relative;
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background:
                transition: width .3s;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
            width: 100%;
        }


        .conv-item {
            transition: background .15s ease;
            cursor: pointer;
        }

        .conv-item:hover {
            background:
        }

        .conv-item.active {
            background:
                border-right: 3px solid
        }


        .bubble-me {
            background:
                color: white;
            border-radius: 16px 16px 2px 16px;
            display: inline-block;
        }

        .bubble-them {
            background:
                color: border-radius: 16px 16px 16px 2px;
            display: inline-block;
        }



        overflow-y: auto;
        overflow-x: hidden;
        scroll-behavior: smooth;
        flex: 1;
        }


        width: 4px;
        }


        background: border-radius: 4px;
        }


        padding: 1.25rem 2rem 1.25rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        min-height: 100%;
        }



        overflow-y: auto;
        }


        width: 3px;
        }


        background: border-radius: 3px;
        }



        outline: none;
        }


        @keyframes popIn {
            from {
                opacity: 0;
                transform: translateY(8px);
            }

            to {
                opacity: 1;
                transform: none;
            }
        }

        .msg-new {
            animation: popIn .2s ease;
        }


        .typing span {
            width: 6px;
            height: 6px;
            background:
                border-radius: 50%;
            display: inline-block;
            animation: bounce 1.2s infinite;
        }

        .typing span:nth-child(2) {
            animation-delay: .2s;
        }

        .typing span:nth-child(3) {
            animation-delay: .4s;
        }

        @keyframes bounce {

            0%,
            60%,
            100% {
                transform: translateY(0);
            }

            30% {
                transform: translateY(-5px);
            }
        }
    </style>
    <script src="accessibility.js?v=2"></script>
</head>

<body class="bg-[#FFFFF6] flex flex-col">


    <nav class="bg-white px-6 pt-4 shadow-sm border-b-2 border-[#FCE297] sticky top-0 z-50 rounded-full flex-shrink-0">
        <div class="container mx-auto flex flex-col gap-4">
            <div class="flex justify-between items-center w-full">
                <a href="index.php" class="h-20"><img src="img/logo.png" alt="Logo Silver Happy" class="h-14" /></a>
                <div class="flex items-center space-x-6 group">
                    <div
                        class="w-10 h-10 rounded-full bg-[#7CABD3] flex items-center justify-center text-white text-sm font-bold shadow cursor-pointer">
                        <?php echo $senior['avatar_initiales'] ?? 'MF'; ?>
                    </div>
                    <p class="text-gray-300">|</p>
                    <a href="logout.php"
                        class="inline-block px-6 py-2 btn text-gray-500 bg-white hover:text-red-500 hover:bg-gray-50 rounded-full transition-all duration-300"
                        role="button">Déconnexion</a>
                </div>
            </div>
            <div class="flex pb-4 gap-10 mx-auto overflow-x-auto whitespace-nowrap px-4 w-full justify-center">
                <a href="profil_senior.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Mon
                    profil</a>
                <a href="reservation_senior.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Réserver</a>
                <a href="mes_devis.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Mes
                    devis</a>
                <a href="chat.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-[#FCE297] text-[#7CABD3] transition-all duration-200">Chat</a>
                <a href="catalogue.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Catalogue</a>
                <a href="conseils.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Conseils</a>
                <a href="documents.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Documents</a>
            </div>
        </div>
    </nav>


    <div class="flex flex-1 overflow-hidden max-w-6xl w-full mx-auto" style="height: calc(100vh - 72px)">


        <div class="w-80 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">


            <div class="px-5 py-4 border-b border-gray-100">
                <h1 class="text-base font-bold text-[#1A2B49]">Messagerie</h1>
                <p id="conv-count" class="text-[10px] text-gray-400 mt-0.5">Chargement...</p>
            </div>


            <div class="px-4 py-3 border-b border-gray-100">
                <div class="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2.5">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input type="text" placeholder="Rechercher…" oninput="filterConvs(this.value)"
                        class="bg-transparent text-sm text-gray-600 placeholder-gray-300 w-full focus:outline-none">
                </div>
            </div>


            <div id="conv-list" class="flex-1">

            </div>
        </div>


        <div class="flex-1 flex flex-col bg-[#FFFFF6] overflow-hidden">


            <div id="chat-header"
                class="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm">
                <div class="flex items-center gap-3">
                    <div id="chat-avatar"
                        class="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black"
                        style="background:#1A2B49">SH</div>
                    <div>
                        <p id="chat-name" class="text-sm font-bold text-[#1A2B49]">Silver Happy Support</p>
                        <p id="chat-status" class="text-[10px] text-emerald-500 font-bold">● En ligne</p>
                    </div>
                </div>
            </div>


            <div id="scroll-wrap">
                <div id="messages-zone">

                </div>
            </div>


            <div class="bg-white border-t border-gray-100 px-5 py-4 flex-shrink-0">
                <div class="flex items-end gap-3">


                    <div class="flex items-center gap-1 flex-shrink-0 pb-2">
                        <button onclick="toggleEmojis()"
                            class="w-8 h-8 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-colors flex items-center justify-center text-lg">
                            😊
                        </button>
                        <button
                            class="w-8 h-8 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-colors flex items-center justify-center">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path
                                    d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                            </svg>
                        </button>
                    </div>


                    <div id="emoji-picker"
                        class="hidden absolute bottom-20 left-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 grid grid-cols-7 gap-1 z-10">
                        <?php foreach (['😊', '😄', '👍', '❤️', '🙏', '😢', '😮', '🎉', '👋', '💪', '✅', '⭐', '🏠', '🌸', '☀️', '🤝', '💬', '📞', '📅', '🔔', '🌈'] as $e): ?>
                            <button onclick="insertEmoji('<?php echo $e; ?>')"
                                class="text-xl hover:scale-125 transition-transform p-1">
                                <?php echo $e; ?>
                            </button>
                        <?php endforeach; ?>
                    </div>


                    <div class="flex-1 bg-gray-50 rounded-2xl px-4 py-2.5 flex items-end gap-2">
                        <textarea id="msg-input" rows="1" placeholder="Écrire un message…"
                            class="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-300 resize-none max-h-32 focus:outline-none leading-snug"
                            onkeydown="handleKey(event)" oninput="autoResize(this)"></textarea>
                    </div>


                    <button id="send-btn" onclick="sendMessage()"
                        class="w-10 h-10 rounded-full bg-[#1A2B49] hover:bg-[#2a4070] text-white flex items-center justify-center transition-all hover:scale-105 flex-shrink-0 shadow-sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>

                </div>
            </div>
        </div>

    </div>

    <script>
        let allConvs = [];
        let activeId = 0;

        const supportConv = {
            id: 0,
            nom: 'Silver Happy Support',
            initiales: 'SH',
            couleur: '#1A2B49',
            type: 'support',
            online: true,
            last_msg: 'Bonjour Madeleine, comment pouvons-nous vous aider ?',
            last_time: '<?php echo date('H:i'); ?>',
            unread: 0,
            messages: [
                { from: 'them', txt: 'Bonjour Madeleine ! Bienvenue chez Silver Happy. Comment pouvons-nous vous aider aujourd\'hui ?', time: '10:40' }
            ]
        };


        async function loadConversations() {
            try {
                const res = await fetch('api_chat.php?action=list_conversations');
                const dbConvs = await res.json();


                const formattedDbConvs = dbConvs.map(c => ({
                    id: parseInt(c.id),
                    nom: c.prenom + ' ' + c.nom,
                    initiales: (c.prenom.substring(0, 1) + c.nom.substring(0, 1)).toUpperCase(),
                    couleur: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    type: c.role,
                    online: false,
                    last_msg: c.last_msg || 'Dites bonjour !',
                    last_time: c.last_time ? new Date(c.last_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '',
                    unread: parseInt(c.unread) || 0,
                    messages: []
                }));

                allConvs = [supportConv, ...formattedDbConvs];
                document.getElementById('conv-count').textContent = allConvs.length + ' conversations';
                renderConvList();
            } catch (err) {
                console.error("Erreur chargement conversations", err);
                allConvs = [supportConv];
                renderConvList();
            }
        }

        function renderConvList() {
            const list = document.getElementById('conv-list');
            list.innerHTML = '';
            allConvs.forEach(c => {
                const html = `
                    <div class="conv-item px-4 py-3.5 flex items-center gap-3 border-b border-gray-50 ${c.id === activeId ? 'active' : ''}"
                        data-id="${c.id}" onclick="openConv(${c.id})">
                        <div class="relative flex-shrink-0">
                            <div class="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-black"
                                style="background:${c.couleur}">
                                ${c.initiales}
                            </div>
                            ${c.online ? '<span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></span>' : ''}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between mb-0.5">
                                <p class="text-sm font-bold text-[#1A2B49] truncate">${escHtml(c.nom)}</p>
                                <span class="text-[10px] text-gray-300 flex-shrink-0 ml-2">${c.last_time}</span>
                            </div>
                            <div class="flex items-center justify-between gap-1">
                                <p class="text-xs text-gray-400 truncate">${escHtml(c.last_msg)}</p>
                                ${c.unread > 0 ? `<span class="flex-shrink-0 w-5 h-5 bg-[#7CABD3] text-white text-[10px] font-bold rounded-full flex items-center justify-center">${c.unread}</span>` : ''}
                            </div>
                        </div>
                    </div>`;
                list.insertAdjacentHTML('beforeend', html);
            });
        }

        async function openConv(id) {
            activeId = id;
            const conv = allConvs.find(c => c.id === id);
            if (!conv) return;


            document.querySelectorAll('.conv-item').forEach(el => {
                el.classList.toggle('active', parseInt(el.dataset.id) === id);
            });

            document.getElementById('chat-avatar').style.background = conv.couleur;
            document.getElementById('chat-avatar').textContent = conv.initiales;
            document.getElementById('chat-name').textContent = conv.nom;

            const statusEl = document.getElementById('chat-status');
            statusEl.textContent = conv.online ? '● En ligne' : '○ Hors ligne';
            statusEl.className = conv.online ? 'text-[10px] text-emerald-500 font-bold' : 'text-[10px] text-gray-300 font-bold';


            if (id === 0) {
                renderMessages(conv.messages);
            } else {
                try {
                    const res = await fetch(`api_chat.php?action=get_messages&id_contact=${id}`);
                    conv.messages = await res.json();
                    renderMessages(conv.messages);


                    conv.unread = 0;
                    renderConvList();
                } catch (err) {
                    console.error("Erreur messages", err);
                }
            }
        }

        function renderMessages(msgs) {
            const zone = document.getElementById('messages-zone');
            zone.innerHTML = '';
            msgs.forEach(m => {
                const isMe = m.from === 'me';
                const html = `
                    <div class="flex ${isMe ? 'justify-end' : 'justify-start'} msg-new">
                        <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'} gap-1 max-w-[72%]">
                            <div class="${isMe ? 'bubble-me' : 'bubble-them'} px-4 py-2.5 text-sm leading-snug">
                                ${escHtml(m.txt)}
                            </div>
                            <span class="text-[10px] text-gray-300 px-1">${m.time}</span>
                        </div>
                    </div>`;
                zone.insertAdjacentHTML('beforeend', html);
            });
            const wrap = document.getElementById('scroll-wrap');
            wrap.scrollTop = wrap.scrollHeight;
        }

        async function sendMessage() {
            const input = document.getElementById('msg-input');
            const txt = input.value.trim();
            if (!txt) return;

            const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });


            const zone = document.getElementById('messages-zone');
            zone.insertAdjacentHTML('beforeend', `
                <div class="flex justify-end msg-new">
                    <div class="flex flex-col items-end gap-1 max-w-[72%]">
                        <div class="bubble-me px-4 py-2.5 text-sm leading-snug">${escHtml(txt)}</div>
                        <span class="text-[10px] text-gray-300 px-1">${now}</span>
                    </div>
                </div>`);
            document.getElementById('scroll-wrap').scrollTop = document.getElementById('scroll-wrap').scrollHeight;

            input.value = '';
            input.rows = 1;
            input.style.height = '';

            try {
                const res = await fetch('api_chat.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_destinataire: activeId, contenu: txt })
                });
                const result = await res.json();

                if (result.is_support) {

                    showTyping();
                    setTimeout(() => {
                        hideTyping();
                        const rep = getAutoReply(txt);
                        zone.insertAdjacentHTML('beforeend', `
                            <div class="flex justify-start msg-new">
                                <div class="flex flex-col items-start gap-1 max-w-[72%]">
                                    <div class="bubble-them px-4 py-2.5 text-sm leading-snug">${escHtml(rep)}</div>
                                    <span class="text-[10px] text-gray-300 px-1">${now}</span>
                                </div>
                            </div>`);
                        document.getElementById('scroll-wrap').scrollTop = document.getElementById('scroll-wrap').scrollHeight;
                    }, 1000);
                }
            } catch (err) {
                console.error("Erreur envoi", err);
            }
        }


        function getAutoReply(txt) {
            if (txt.toLowerCase().includes('merci')) return 'Avec plaisir Madeleine ! 😊';
            if (txt.toLowerCase().includes('bonjour')) return 'Bonjour Madeleine ! Comment puis-je vous aider ?';
            return 'Bien reçu ! Un conseiller Silver Happy va traiter votre demande.';
        }

        function showTyping() {
            const zone = document.getElementById('messages-zone');
            zone.insertAdjacentHTML('beforeend', `<div id="typing-indicator" class="flex justify-start"><div class="bubble-them px-4 py-3 typing"><span></span><span></span><span></span></div></div>`);
            document.getElementById('scroll-wrap').scrollTop = document.getElementById('scroll-wrap').scrollHeight;
        }
        function hideTyping() {
            const t = document.getElementById('typing-indicator');
            if (t) t.remove();
        }

        function filterConvs(q) {
            const lower = q.toLowerCase();
            document.querySelectorAll('.conv-item').forEach(el => {
                const name = el.querySelector('p.font-bold').textContent.toLowerCase();
                el.style.display = name.includes(lower) ? '' : 'none';
            });
        }

        function toggleEmojis() { document.getElementById('emoji-picker').classList.toggle('hidden'); }
        function insertEmoji(e) {
            const inp = document.getElementById('msg-input');
            inp.value += e;
            inp.focus();
            document.getElementById('emoji-picker').classList.add('hidden');
        }
        function handleKey(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }
        function autoResize(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 120) + 'px'; }
        function escHtml(str) { return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/\n/g, '<br>'); }

        document.addEventListener('click', e => {
            if (!e.target.closest('#emoji-picker') && !e.target.closest('button[onclick="toggleEmojis()"]')) {
                document.getElementById('emoji-picker').classList.add('hidden');
            }
        });


        loadConversations().then(() => openConv(0));
    </script>

</body>

</html>

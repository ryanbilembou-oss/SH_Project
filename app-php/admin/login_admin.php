<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy — Administration</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #111827; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-6 relative bg-gray-900">

   
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl"></div>
    </div>

    <div id="toast" class="fixed top-6 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-50 transition-all duration-500 pointer-events-none">
        <div class="bg-white text-gray-800 px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <span id="toastIcon" class="text-lg"></span>
            <span id="toastMsg" class="font-fira uppercase text-xs tracking-widest"></span>
        </div>
    </div>

    <div class="max-w-md w-full relative z-10">
 
        <div class="text-center mb-10">
            <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/30">
                <i class="fas fa-shield-alt text-white text-2xl"></i>
            </div>
            <h1 class="text-4xl font-fira uppercase tracking-tighter text-white mb-1">
                Silver Happy
            </h1>
            <p class="text-gray-400 text-sm font-fira uppercase tracking-widest">Espace Administration</p>
        </div>
 
        <div class="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8">

            <div class="mb-8">
                <h2 class="text-2xl font-fira uppercase text-white mb-1">Connexion</h2>
                <p class="text-gray-400 text-sm">Accès réservé aux administrateurs Silver Happy.</p>
            </div>

            <form id="loginAdminForm" class="space-y-5">

                <div>
                    <label class="block text-xs font-fira uppercase tracking-widest text-gray-400 mb-2">
                        <i class="fas fa-envelope mr-2 text-blue-400"></i>Email administrateur
                    </label>
                    <input type="email" id="email" placeholder="admin@silverhappy.fr" required
                        class="w-full px-5 py-3 bg-gray-700 border-2 border-gray-600 focus:border-blue-500 rounded-xl outline-none transition-all font-fira text-white placeholder:text-gray-500">
                    <p id="error-email" class="hidden text-xs text-red-400 font-fira mt-1 ml-1"></p>
                </div>

                <div>
                    <label class="block text-xs font-fira uppercase tracking-widest text-gray-400 mb-2">
                        <i class="fas fa-lock mr-2 text-blue-400"></i>Mot de passe
                    </label>
                    <div class="relative">
                        <input type="password" id="password" placeholder="••••••••" required
                            class="w-full px-5 py-3 bg-gray-700 border-2 border-gray-600 focus:border-blue-500 rounded-xl outline-none transition-all font-fira text-white placeholder:text-gray-500">
                        <button type="button" id="togglePassword"
                            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors">
                            <i class="fas fa-eye" id="eyeIcon"></i>
                        </button>
                    </div>
                    <p id="error-password" class="hidden text-xs text-red-400 font-fira mt-1 ml-1"></p>
                </div>

                <p id="error-global" class="hidden text-xs text-red-400 font-fira text-center bg-red-400/10 border border-red-400/20 rounded-xl py-3 px-4"></p>

                <button type="submit" id="submitBtn"
                    class="w-full bg-blue-600 text-white font-fira uppercase tracking-widest text-sm py-4 rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all">
                    <i class="fas fa-sign-in-alt mr-2"></i> Se connecter
                </button>

            </form>

            <div class="mt-6 pt-6 border-t border-gray-700 text-center">
                <a href="/users/login.php" class="text-gray-500 text-xs font-fira hover:text-gray-300 transition-colors">
                    <i class="fas fa-arrow-left mr-1"></i> Accès utilisateur standard
                </a>
            </div>
        </div> 
        <p class="text-center text-gray-600 text-xs font-fira mt-6 uppercase tracking-widest">
            Silver Happy © <?php echo date('Y'); ?> — Accès sécurisé
        </p>
    </div>

    <script>
    const API_BASE = "http://172.16.90.10:8082";

 
    document.getElementById("togglePassword").addEventListener("click", () => {
        const input = document.getElementById("password");
        const icon  = document.getElementById("eyeIcon");
        if (input.type === "password") {
            input.type = "text";
            icon.className = "fas fa-eye-slash";
        } else {
            input.type = "password";
            icon.className = "fas fa-eye";
        }
    });
 
    document.getElementById("loginAdminForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email    = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const btn      = document.getElementById("submitBtn");
        const errGlobal = document.getElementById("error-global");

        errGlobal.classList.add("hidden");
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Connexion...';

        try {
            const res = await fetch(`${API_BASE}/login`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ email, mot_de_passe: password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.erreur || "Identifiants incorrects.");
            }
 
            if (data.role !== "admin") {
                throw new Error("Accès refusé — cet espace est réservé aux administrateurs.");
            }
 
            localStorage.setItem("id_user", data.id_user);
            localStorage.setItem("email",   data.email);
            localStorage.setItem("role",    data.role);

            showToast("Connexion réussie !", "success");
            setTimeout(() => { window.location.href = "/admin/admin_dashboard.php"; }, 800);

        } catch (err) {
            errGlobal.textContent = err.message;
            errGlobal.classList.remove("hidden");
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i> Se connecter';
        }
    });

    function showToast(message, type = "info") {
        const toast = document.getElementById("toast");
        document.getElementById("toastMsg").textContent  = message;
        document.getElementById("toastIcon").textContent = type === "success" ? "✓" : "✗";
        toast.classList.remove("-translate-y-20", "opacity-0");
        toast.classList.add("translate-y-0", "opacity-100");
        setTimeout(() => {
            toast.classList.remove("translate-y-0", "opacity-100");
            toast.classList.add("-translate-y-20", "opacity-0");
        }, 3000);
    }
    </script>
</body>
</html>
window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function (OneSignal) {
  await OneSignal.init({
    appId: "37e06249-3a90-4d5f-a9be-c3dfce1c483d",
    notifyButton: { enable: false },
    allowLocalhostAsSecureOrigin: true,
  });

  OneSignal.Notifications.addEventListener(
    "permissionChange",
    async (granted) => {
      if (granted) {
        const playerId = await OneSignal.User.PushSubscription.id;
        if (playerId) await sauvegarderPlayerId(playerId);
      }
    },
  );

  const playerId = await OneSignal.User.PushSubscription.id;
  if (playerId) await sauvegarderPlayerId(playerId);
});

async function sauvegarderPlayerId(playerId) {
  const userId = Number(localStorage.getItem("id_user"));
  if (!userId) return;
  try {
    await fetch(`http://172.16.90.10:8082/admin/notification/save_player_id`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user: userId, player_id: playerId }),
    });
  } catch {}
}

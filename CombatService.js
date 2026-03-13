const players = new Map();
const battleId = new Map();
const battleInfo = new Map();

players.set(0, {"hp": 5000, "gun": 250, "rockets": 10, "shields": 7, "powershooters": 5, "health": 6});
players.set(1, {"hp": 5000, "gun": 250, "rockets": 10, "shields": 7, "powershooters": 5, "health": 6});

battleId.set(0, 100);
battleId.set(1, 100);

battleInfo.set(100, [0, 1]);

function attack(player_id, attack_type) {
  let player = players.get(player_id);
  if (player) {
    ammo_num = player[attack_type];

    if (ammo_num != 0) {
      let battleId = battleId.get(player_id);
      let playersInBattle = battleInfo.get(battleId);
      let enemy = players.get(playersInBattle.remove(0)[0]);

      if (attack_type === "gun") enemy.hp -= ammo_num;
      if (attack_type === "rockets") {
        enemy.hp -= 500;
        enemy.rockets -= 1;
      }
      if (attack_type === "health") {
        let helpHpVar = player.hp + 300;
        player.hp = helpHpVar > 5000 ? 5000 : helpHpVar;
      }
      else return "This ammo type will come soon";
    }
    else return "You don't have this ammo(";
  }
  else return "Player is not in this battle";
}

attack(0, "gun");
attack(0, "gun");
attack(0, "gun");
attack(0, "gun");

attack(1, "rockets");
attack(1, "rockets");
attack(1, "rockets");

attack(0, "health");
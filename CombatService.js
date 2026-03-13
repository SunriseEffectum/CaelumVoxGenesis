const players = new Map();
const battleId = new Map();
const battleInfo = new Map();

players.set(0, {"hp": 5000, "gun": 250, "rockets": 10, "shields": 7, "powershooters": 5, "health": 6,
  "attack": 250, "protection": 400, "shieldUntil": 0, "powershootersUntil": 0});
players.set(1, {"hp": 5000, "gun": 250, "rockets": 10, "shields": 7, "powershooters": 5, "health": 6,
  "attack": 250, "protection": 400, "shieldUntil": 0, "powershootersUntil": 0});

battleId.set(0, 100);
battleId.set(1, 100);

battleInfo.set(100, [0, 1]);

function attack(player_id, attack_type) {
  let player = players.get(player_id);
  if (player) {
    ammo_num = player[attack_type];

    if (ammo_num != 0) {
      if (attack_type === "health") {
        let helpHpVar = player.hp + 300;
        player.hp = helpHpVar > 5000 ? 5000 : helpHpVar;
        player.health -= 1;
        return 1;
      }

      if (attack_type === "shields") {
        player.shieldUntil = Date.now() + 15000;
        player.shields -= 1;
        return 1;
      }

      if (attack_type === "powershooters") {
        player.powershootersUntil = Date.now() + 25000;
        player.powershooters -= 1;
        return 1;
      }

      let id = battleId.get(player_id);
      let playersInBattle = battleInfo.get(id);
      let enemy = players.get(playersInBattle.find(id => id !== player_id));
      let luck_coeff = Math.round((Math.random() / 2) * 100) / 100;
      let player_luck = luck_coeff < 0.25 ? -luck_coeff : 0.5 - luck_coeff;

      luck_coeff = Math.round((Math.random() / 2) * 100) / 100;
      let enemy_luck = luck_coeff < 0.25 ? -luck_coeff : 0.5 - luck_coeff;

      let player_attack = Date.now() < player.powershootersUntil ? player.attack * 3 * (1 + player_luck) : player.attack * (1 + player_luck);
      let enemy_protection = Date.now() < enemy.shieldUntil ? enemy.protection * 3 * (1 + enemy_luck) : enemy.protection * (1 + enemy_luck);

      if (attack_type === "gun") {
        let damage = player_attack / (1 + enemy_protection / 100);
        damage = damage > 1 ? damage : 1;
        enemy.hp -= damage;
        return 1;
      }

      if (attack_type === "rockets") {
        let damage = player_attack * 4 / (1 + enemy_protection / 100);
        damage = damage > 1 ? damage : 1;
        enemy.hp -= damage;
        player.rockets -= 1;
        return 1;
      }
    }
    else return "You don't have this ammo(";
  }
  else return "Player is not in this battle";
}

attack(0, "gun");
attack(0, "gun");
attack(0, "gun");
attack(0, "gun");
console.log(players.get(1));

attack(1, "rockets");
attack(1, "rockets");
attack(1, "rockets");
console.log(players.get(0));

attack(0, "health");
console.log(players.get(0));
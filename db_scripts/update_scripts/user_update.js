db.users.update({}, {$unset: {history: ""}});
db.users.update({}, {$})
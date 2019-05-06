
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Joe', password: '12345'},
        {username: 'Jim', password: '12345'},
        {username: 'Mike', password: '12345'}
      ]);
    });
};

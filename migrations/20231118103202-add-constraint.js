'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addConstraint('Products', {
      fields: ["CategoryId"],
      type: 'foreign key',
      name: 'fk_categories',
      references: {
        table: "Categories",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    }),
      queryInterface.addConstraint('TransactionsHistories', {
        fields: ["ProductId"],
        type: 'foreign key',
        name: 'fk_productid',
        references: {
          table: "Products",
          field: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      }),
      queryInterface.addConstraint('TransactionsHistories', {
        fields: ["UserId"],
        type: 'foreign key',
        name: 'fk_userid',
        references: {
          table: "Users",
          field: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint("Products", "fk_category"),
      await queryInterface.removeColumn("Products", "CategoryId"),
      await queryInterface.removeConstraint("TransactionsHistories", "fk_productid"),
      await queryInterface.removeColumn("TransactionsHistories", "ProductId"),
      await queryInterface.removeConstraint("TransactionsHistories", "fk_userid"),
      await queryInterface.removeColumn("TransactionsHistories", "UserId");
  }
};

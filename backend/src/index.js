"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],

      // your lifecycle hooks
      async beforeUpdate(event) {
        const user = await strapi
          .query("plugin::users-permissions.user")
          .findOne({
            where: event.params.where,
            populate: {
              answered_multi_choice_questions: {
                select: ["id"],
              },
            },
          });

        if (user) {
          event.params.data.answered_multi_choice_questions = [
            ...user.answered_multi_choice_questions,
            ...event.params.data.answered_multi_choice_questions,
          ];
        }
      },
    });
  },
};

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

        // If it is a single id, it should be pushed to the array instead of overriding it.
        if (event.params.data.answered_multi_choice_questions.length === 1) {
          // Check if id is already in array If it is not, push it to the array.
          const isAlreadyAnswered = user.answered_multi_choice_questions.some(
            (question) =>
              question.id ==
              event.params.data.answered_multi_choice_questions[0]
          );

          if (user && !isAlreadyAnswered) {
            event.params.data.answered_multi_choice_questions = [
              ...user.answered_multi_choice_questions,
              ...event.params.data.answered_multi_choice_questions,
            ];
          } else {
            event.params.data.answered_multi_choice_questions =
              user.answered_multi_choice_questions;
          }
        }
      },
    });
  },
};

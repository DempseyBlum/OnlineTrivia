"use strict";

/**
 * `isOwnUser` policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  strapi.log.info("In isOwnUser policy.");
  const { user, auth } = policyContext.state;
  const { params } = policyContext;

  const canDoSomething = user.id == params.id;

  if (!canDoSomething) {
    throw new PolicyError("You must be the owner of the entity to do this.", {
      policy: "isOwnUser",
    });
  } else {
    return true;
  }
};

module.exports = (plugin) => {
  for (let i = 0; i < plugin.routes["content-api"].routes.length; i++) {
    const route = plugin.routes["content-api"].routes[i];
    if (
      route.handler === "user.findOne" ||
      route.handler === "user.find" ||
      route.handler === "user.update" ||
      route.handler === "user.destroy"
    ) {
      console.log(route);
      plugin.routes["content-api"].routes[i] = {
        ...route,
        config: {
          ...route.config,
          policies: route.config.policies
            ? [...route.config.policies, "global::isOwnUser"] // tests if policies were defined
            : ["global::isOwnUser"],
        },
      };
    }
  }

  return plugin;
};

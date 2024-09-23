/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/cnc-fvtt/templates/actor/parts/actor-features.hbs',
    'systems/cnc-fvtt/templates/actor/parts/actor-items.hbs',
    'systems/cnc-fvtt/templates/actor/parts/actor-spells.hbs',
    'systems/cnc-fvtt/templates/actor/parts/actor-effects.hbs',
    'systems/cnc-fvtt/templates/actor/parts/actor-powers.hbs',
    // Item partials
    'systems/cnc-fvtt/templates/item/parts/item-effects.hbs',
  ]);
};

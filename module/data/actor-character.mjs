import CapesCapersActorBase from "./base-actor.mjs";

export default class CapesCapersCharacter extends CapesCapersActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.attributes = new fields.SchemaField({
      realname: new fields.StringField({ required: false, blank: true }),
      origin: new fields.StringField({ required: false, blank: true }),
      occupation: new fields.StringField({ required: false, blank: true }),
      powersets: new fields.StringField({ required: false, blank: true }),
      speed: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0 }),
      stress: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      trainingdice: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      level: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 })
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(Object.keys(CONFIG.CAPES_CAPERS.abilities).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    // Loop through ability scores, and add their modifiers to our sheet output.
    for (const key in this.abilities) {
      // Calculate the modifier using d20 rules.
      this.abilities[key].mod = Math.floor((this.abilities[key].value - 10) / 2);
      // Handle ability label localization.
      this.abilities[key].label = game.i18n.localize(CONFIG.CAPES_CAPERS.abilities[key]) ?? key;
    }
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@mig.mod + 4`.
    if (this.abilities) {
      for (let [k,v] of Object.entries(this.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.attributes.level.value;

    return data
  }
}
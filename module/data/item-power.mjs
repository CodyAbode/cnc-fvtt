import CapesCapersItemBase from "./base-item.mjs";

export default class CapesCapersItem extends CapesCapersItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.powerset = new fields.StringField({ required: false, blank: true });
    schema.ppcost = new fields.StringField({ required: false, blank: true });
    schema.actioncost = new fields.StringField({ required: false, blank: true });
    schema.requirements = new fields.StringField({ required: false, blank: true });

    schema.shortdescription = new fields.StringField({ required: false, blank: true });

    // // Break down roll formula into three independent fields
    // schema.roll = new fields.SchemaField({
    //   diceNum: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 }),
    //   diceSize: new fields.StringField({ initial: "d20" }),
    //   diceBonus: new fields.StringField({ initial: "+@mig.mod" })
    // })

    schema.formula = new fields.StringField({ initial: "1d20+@mig.mod", blank: true });

    return schema;
  }

  // prepareDerivedData() {
  //   // Build the formula dynamically using string interpolation
  //   const roll = this.roll;

  //   this.formula = `${roll.diceNum}${roll.diceSize}${roll.diceBonus}`
  // }
}
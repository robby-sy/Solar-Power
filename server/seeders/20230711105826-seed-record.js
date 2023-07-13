"use strict";

function voltageGenerator(base_voltage, createdAt) {
  const created = new Date(createdAt);
  const hour = created.getHours();
  if (hour < 7 || hour >= 17) return 0;
  const minutes = hour * 60 + created.getMinutes();
  return (
    Math.random() * 0.5 +
    Math.cos(-0.78 + ((minutes - 420) / 600) * 1.57) * base_voltage
  );
}

function currentGenerator(panel_count,voltage,createdAt){
  const created = new Date(createdAt);
  const hour = created.getHours();
  if (hour < 7 || hour >= 17) return 0;
  const minutes = hour * 60 + created.getMinutes();
  let current = 0
  for(let i = 0 ; i < 10 ; i++){
    current += ((Math.cos(-0.78 + ((minutes - 420) / 600) * 1.57)*100 - Math.random()*15)*panel_count/10)/voltage
  }
  return current
}

function tempGenerator(createdAt){
  const created = new Date(createdAt);
  const hour = created.getHours();
  if (hour < 7 || hour >= 17) return Math.random()*1 + 23;
  const minutes = hour * 60 + created.getMinutes();
  return (
    Math.random() * 0.5 +
    Math.cos(-0.78 + ((minutes - 420) / 600) * 1.57) * 32
  );
}

function humidityGenerator(createdAt){
  const created = new Date(createdAt);
  const hour = created.getHours();
  if (hour < 7 || hour >= 17) return Math.random()*1 + 23;
  const minutes = hour * 60 + created.getMinutes();
  return (
    Math.random() * 0.5 +
    Math.cos(-0.78 + ((minutes - 420) / 600) * 1.57) * 94
  );
}

function intensityGenerator(createdAt){
  const created = new Date(createdAt);
  const hour = created.getHours();
  if (hour < 7 || hour >= 17) return 0;
  const minutes = hour * 60 + created.getMinutes();
  return (
    Math.random() * 100 +
    Math.cos(-0.78 + ((minutes - 420) / 600) * 1.57) * 900
  );
}

function recordGenerator(start_date, power, ProjectId) {
  const records = [];
  const start = new Date(start_date);
  const record_count = Math.floor((new Date() - start) / 60000);
  const panel_count = power / 100;
  const base_voltage = (panel_count / 10) * 12;
  for (let i = 1; i < record_count; i++) {
    const record = {};
    record.createdAt = new Date(start.setMinutes(start.getMinutes() + 1));
    record.updatedAt = new Date(start);
    record.voltage = voltageGenerator(base_voltage, record.createdAt);
    record.ProjectId = ProjectId+1;
    record.current = currentGenerator(panel_count,record.voltage,record.createdAt)
    record.power = record.voltage*record.current
    record.temperature = tempGenerator(record.createdAt)
    record.humidity = humidityGenerator(record.createdAt)
    record.intensity = intensityGenerator(record.createdAt)
    records.push(record)
  }
  return records
}

const data = require('./project.json')
let records = []
data.forEach((el,index) =>{
  const temp = recordGenerator('2023-07-09',el.power,index)
  records = [...records,...temp]
})


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Records',records)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Records')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

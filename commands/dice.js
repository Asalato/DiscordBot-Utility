const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dice')
        .setDescription('ダイスロールを行います')
        .addIntegerOption(option =>
            option.setName('count')
                .setDescription('ダイスの数')
                .setRequired(true)
                .setMinValue(1))
        .addIntegerOption(option =>
            option.setName('range')
                .setDescription('何面ダイスか')
                .setRequired(true)
                .setMinValue(1)),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const count = interaction.options.getInteger('count');
        const range = interaction.options.getInteger('range');
        const randomNumber = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        const result = [...Array(count)].map(_ => randomNumber(1, range)).reduce((acm, v) => {return acm + v}, 0);

        let response = `${count}d${range} -> **${result}**`;
        if (result === range) response += " (**MIN**)";
        else if (result === range * count) response += " (**MAX**)";
        await interaction.reply(response);
    },
};

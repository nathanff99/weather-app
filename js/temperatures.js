import { getWeatherDaily } from "./days5.js";

export const dataTeste = async (city) => {
    const dados = await getWeatherDaily(city);
    const temperaturasPorDia = {};    

    dados.list.forEach(elemento => {
        const dataHora = elemento.dt_txt;
        const temperatura = elemento.main.temp;        
        const icon = elemento.weather[0].icon     
        const dataSeparada = dataHora.split(' ')[0];
        const hora = dataHora.split(' ')[1].split(':')[0];

        if (!temperaturasPorDia[dataSeparada]) {
            temperaturasPorDia[dataSeparada] = {
                dia: dataSeparada,
                temperaturas: [{ hora, temperatura, icon}],
                min: temperatura,
                max: temperatura,                                            
            };
        } else {
            const dia = temperaturasPorDia[dataSeparada];
            dia.min = Math.min(dia.min, temperatura);
            dia.max = Math.max(dia.max, temperatura);
            dia.temperaturas.push({ hora, temperatura, icon });
        }
    });

    const resultado = Object.values(temperaturasPorDia);

    console.log(resultado);
    return resultado;
}





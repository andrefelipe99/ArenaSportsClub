import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

export async function GPTconfiguration(localization, language) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista de futebol e de localidades geográficas, primeiramente irei te informar coordenadas \
            de GPS e sua única atividade será encontrar equipes de futebol próximas a essas coordenadas informadas. \
            Você deverá me retornar em forma de lista enumerada, e apenas essa lista com as equipes e uma breve descrição sobre elas. \
            Não envie nenhuma mensagem sobre você ter acesso a informações até 2021 e também não solicite novas coordenadas. \
            Também irei te informar a língua que você precisa me responder. As coordenadas serão enviadas separadas por três --- \
            e a linguagem desejada separada por três ***",
        },
        {
          role: "user",
          content: `Estas são minhas coordenadas --- ${localization[0]}, ${localization[1]} --- e essa é a linguagem da resposta *** ${language} ***`,
        },
      ],
    });

    return chatCompletion.data.choices[0].message;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

export async function getLocalizationResponse(req, res, next) {
  try {
    let body = req.body;
    let { localization, language } = body;
    const response = await GPTconfiguration(localization, language);

    res.status(200).json({
      data: response,
    });

    return;
  } catch (e) {
    console.log(`api, ${e}`);
    res.status(500).json({ error: e });
    return;
  }
}

import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

export async function GPTconfiguration(localization) {
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
            Você não precisa explicar que você possui conhecimento apenas até 2021, basta apenas informar em forma \
            de lista as equipes e uma breve descrição sobre elas. As coordenadas serão enviadas separadas por três ---",
        },
        {
          role: "user",
          content: `Estas são minhas coordenadas --- ${localization[0]}, ${localization[1]} ---`,
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
    let { localization } = body;
    const response = await GPTconfiguration(localization);

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

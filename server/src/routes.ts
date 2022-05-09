import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
   const { type, comment, screenshot } = req.body;

   // inversao de dependencia, o arquivo que for precisar utilizar o submit-feedback-use-case e quem passa pra ele as dependencias
   //ao declarar assim voce esta desacoplando a necessidade de instanciar o prisma na classe do use-case, dai se voce for mudar do prisma para outra coisa depois ele nao vai impactar no que ja existe naquela classe
   const prismaFeedbacksRepository = new PrismaFeedbackRepository()
   const nodemailerMailAdapter = new NodemailerMailAdapter()

   const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
   )

   await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot
   })

   return res.status(201).send();
})
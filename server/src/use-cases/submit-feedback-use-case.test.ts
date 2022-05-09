import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

// spies = espioes, formas de saber se, dento do teste, uma funcao foi chamada
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
   { create: createFeedbackSpy },
   { sendMail: sendMailSpy }
)

describe('Submit Feedback', () => {
   it('should be able to submit a feedback', async () => {
      await expect(submitFeedback.execute({
         type: 'BUG',
         comment: 'example comment',
         screenshot: 'data:image/png;base64,129838912738971289syyuiwuwqhuiyq87wy78qwye7qwe',
      })).resolves.not.toThrow(); // estou esperando que chegue ao final e NAO dispare nenhum erro

      expect(createFeedbackSpy).toHaveBeenCalled();
      expect(sendMailSpy).toHaveBeenCalled();
   });

   it('should not be able to submit a feedback without type', async () => {
      await expect(submitFeedback.execute({
         type: '',
         comment: 'example comment',
         screenshot: 'data:image/png;base64,129838912738971289syyuiwuwqhuiyq87wy78qwye7qwe',
      })).rejects.toThrow();
   });

   it('should not be able to submit a feedback without comment', async () => {
      await expect(submitFeedback.execute({
         type: 'BUG',
         comment: '',
         screenshot: 'data:image/png;base64,129838912738971289syyuiwuwqhuiyq87wy78qwye7qwe',
      })).rejects.toThrow();
   });

   it('should not be able to submit a feedback with an invalid screenshot', async () => {
      await expect(submitFeedback.execute({
         type: 'BUG',
         comment: 'example comment',
         screenshot: 'teste.jpg',
      })).rejects.toThrow();
   });
});
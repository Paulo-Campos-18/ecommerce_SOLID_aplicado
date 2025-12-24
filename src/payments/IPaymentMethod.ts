export interface IPaymentMethod{
    //Como não é o foco  do trabalho deixei process para enviar uma menssagem como sucesso e afins.
    details:string
    process():void
}
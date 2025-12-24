export class notificationService{
    // 5. NOTIFICAÇÃO (Violação de SRP - Efeitos colaterais no Controller) 
      const mailer = await getMailClient();

      const info = await mailer.sendMail({
        from: '"DevStore" <noreply@devstore.com>',
        to: customer, // O email do cliente vindo do body
        subject: `Confirmação do Pedido #${order.id}`,
        text: `Olá, seu pedido #${order.id} no valor de R$ ${totalAmount} foi confirmado.`,
        html: `
          <h1>Pedido Confirmado!</h1>
          <p>Olá, seu pedido <b>#${order.id}</b> foi processado com sucesso.</p>
          <p>Total: <strong>R$ ${totalAmount}</strong></p>
          <ul>
            ${productsDetails.map(p => `<li>${p.name}</li>`).join('')}
          </ul>
        `,
      });

      // use este link para visualizar no Ethereal
      logger.info(`Email enviado: ${nodemailer.getTestMessageUrl(info)}`); 

      return res.json({ 
        message: 'Pedido processado com sucesso', 
        orderId: order.id,
        emailPreview: nodemailer.getTestMessageUrl(info) // Retorna o link na API para facilitar
      });

}
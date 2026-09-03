const mini=document.getElementById('floatingCart');
function refreshExtras(){
  const count=document.getElementById('cartCount').textContent;
  const total=document.getElementById('cartTotal').textContent;
  document.getElementById('floatingCount').textContent=`${count} ${count==='1'?'item':'itens'}`;
  document.getElementById('floatingTotal').textContent=total;
  document.querySelectorAll('.card').forEach(card=>{const button=card.querySelector('.add');const title=card.querySelector('h3')?.textContent;const line=[...document.querySelectorAll('.cart-line h4')].find(x=>x.textContent===title);const quantity=line?.parentElement.parentElement.querySelector('.qty b')?.textContent||'';card.classList.toggle('in-cart',!!line);if(button)button.textContent=line?'✓':'+';let badge=card.querySelector('.cart-quantity');if(line&&!badge){badge=document.createElement('span');badge.className='cart-quantity';card.querySelector('.product-image').appendChild(badge)}if(badge){badge.textContent=line?`${quantity} no carrinho`:'';badge.hidden=!line}});
}
new MutationObserver(refreshExtras).observe(document.getElementById('cartItems'),{childList:true,subtree:true});
document.getElementById('floatingCart').onclick=()=>document.getElementById('openCart').click();
const footer=document.querySelector('.cart-footer');
footer.insertAdjacentHTML('afterbegin',`<div class="customer-form"><h3>Dados para entrega</h3><input id="customerName" placeholder="Nome completo" autocomplete="name"><input id="customerAddress" placeholder="Endereço para entrega" autocomplete="street-address"><select id="payment"><option value="">Forma de pagamento</option><option>Pix</option><option>Dinheiro</option><option>Cartão</option></select></div>`);
document.getElementById('checkout').onclick=()=>{const total=parseFloat(document.getElementById('cartTotal').textContent.replace(/[^0-9,-]/g,'').replace('.','').replace(',','.'));const name=document.getElementById('customerName').value.trim();const address=document.getElementById('customerAddress').value.trim();const payment=document.getElementById('payment').value;if(total<50)return;if(!name||!address||!payment){alert('Preencha nome, endereço e forma de pagamento.');return}alert(`Pedido de ${name} recebido!\nEntrega: ${address}\nPagamento: ${payment}`)};
refreshExtras();

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 1,
    priceCents: 0
}, {
    id:'2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 7,
    priceCents: 999
}
];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;
    deliveryOptions.forEach(option => {
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }
    })
    return deliveryOption || deliveryOptions[0];
}

export function displayDate (deliveryOption) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('MMMM D');
  return dateString;
}
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_KEY = "sk_test_51KdyjxLztupzaYHvoaPbr9ZixaFfMRfqXoyZVy3S1OsgDwl6DdyZiWOi4UdfGubHnHlKYgTLiS018i0kSRUCpkAG005UEgMpuj";

const onToken = (user, checkout) => token => checkout(user, token.id);

const Checkout = ({amount, user, checkout }) =>
  <StripeCheckout 
    amount={amount*100}
    token={onToken(user, checkout)}
    currrency='EUR'
    stripeKey={STRIPE_KEY}
  />

export default Checkout;
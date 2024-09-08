import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '../layouts/defaultLayout';
import { CartWithPayment } from '../pages/cartWithPayment';
import { DetailCoffee } from '../pages/detailCoffee';
import { Home } from '../pages/home';
import { NotFound } from '../pages/notFound';
import { PaymentCompleted } from '../pages/paymentCompleted';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cartwithpayment" element={<CartWithPayment />} />
          <Route path="/paymentcompleted" element={<PaymentCompleted />} />
          <Route path="/detail/:id" element={<DetailCoffee />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { Routes, Route  } from 'react-router-dom';
import ContactBook from '../pages/ContactBook';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ContactBook />} />

      {/* Fallback route */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
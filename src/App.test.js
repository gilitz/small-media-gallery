import { render } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const linkElement = document.getElementsByClassName('App');
  expect(linkElement).toHaveLength(1);
});

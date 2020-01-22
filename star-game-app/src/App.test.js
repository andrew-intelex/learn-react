import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  //const { getByText } = render(<App />);
  //const linkElement = getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
  
  const { appComponent } = render(<App />);
  let tree = appComponent;
  
  console.log(tree);
  
  //expect(tree).toMatchSnapshot();
  const linkElement = appComponent(/1/i);
  console.log(linkElement);

  // manually trigger the callback
  //tree.props.onMouseEnter();
});


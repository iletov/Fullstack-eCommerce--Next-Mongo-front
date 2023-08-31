import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { useContext } from 'react';


const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <div onClick={() => scrollPrev()} className='leftArrow' >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
      </svg>
    </div>
  );
};

const RightArrow = () => {
  const  { scrollNext } = useContext(VisibilityContext);

  return (
    <div  onClick={() => scrollNext()} className='rightArrow' >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
      </svg>
    </div>
  );
};

export const HorizontalScroll = ({ children }) => {
  return (
    <>
      <ScrollMenu 
        LeftArrow={LeftArrow} 
        RightArrow={RightArrow}
        >
          {children}
        </ScrollMenu>
    </>
  )
}

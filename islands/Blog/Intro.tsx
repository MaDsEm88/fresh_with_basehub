import { HeroBlogTitle, HeroBlogSubtitle  } from "@/components/Herotext.tsx";
import { useState, useEffect } from 'preact/hooks';

import { Container } from "@/components/container.tsx";


export function Intro() {
  const [isPageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Your existing useEffect code here for IntersectionObserver, body class manipulation, etc.

    // Set the page as loaded after all your effects have run
    setPageLoaded(true);
  }, []);

  return (
    <>
   
                <Container className="w-full  md:max-w-[60vw] mt-[4rem] items-center justify-center text-center max-w-auto">   

    <section className="gap-4 md:justify-between ">
       <HeroBlogTitle className="mt-[1rem] py-4  ">
      Blog
      
     
       
       </HeroBlogTitle>
       <HeroBlogSubtitle>
       An example on how a blog could look like with the use of <a href="https://basehub.com"><span className="text-[#da6e1f] underline">Basehub.com</span></a>

       </HeroBlogSubtitle>
    
       <hr className="mt-[1rem] border-b-[1px] border-black/10 shadow-sm shadow-black/10 "/>

    </section>
    </Container>
 </>
  );
}
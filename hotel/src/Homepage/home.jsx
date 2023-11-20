import React from 'react'


class Home extends React.Component{
    render(){
        return(    
            <div>
                
  {/*  <!--==================== HEADER ====================--> */}
     {/*  <header class="header" id="header">
         <nav class = "nav container ">
            <div class="nav__logo-img">
               <a href="#" class="nav__logo">
                  <img src="assets/img/Suite_Spot_Logo-01.png" alt="explore image" class="logo__perfil" />
                  SuiteSpot
               </a>
            </div>
            
            <div class="nav__menu" id="nav-menu">
               <ul class="nav__list">
                  <li class="nav__item">
                     <a href="#home" class="nav__link">Home</a>
                  </li>
                  <li class="nav__item">
                     <a href="#about" class="nav__link">About</a>
                  </li>
                  <li class="nav__item">
                     <a href="#popular" class="nav__link">Popular</a>
                  </li>
                  <li class="nav__item">
                     <a href="#explore" class="nav__link">Testimonials</a>
                  </li>
                  <li class="nav__item">
                     <a href="#" class="nav__link">Login</a>
                  </li>
               </ul>

              {/*  <!-- Close button--> */}
               {/* <div class="nav__close" id="nav-close">
                  <i class="ri-close-line"> </i>
               </div>
            </div>
 */}
           {/*  <!-- toggle button--> */}
         {/*    <div class="nav__toggle" id="nav-toggle">
               <i class="ri-menu-fill"></i>
            </div>
         
         </nav> */}
      {/* </header>  */}

      {/* <!--==================== MAIN ====================--> */}
      <main class="main">
         {/* <!--==================== HOME ====================--> */}
         <section class="home section" id="home">
            <img src="assets/img/3914367.jpg" alt="home image" class="home__bg"/>
            <div class="home__shadow"></div>

            <div class="home__container container grid">
               <div class="home__data">
                  <h3 class="home__subtitle">
                     Welcome To SuiteSpot
                  </h3>
                  <h1 class="home__title">
                     Explore <br/>
                     The World
                  </h1>
                  <p class="home__description">
                     Live the trips exploring the world, discover paradises, islands,
                     mountains and much more, get your hotel now.
                  </p>
                  <a href="#" class="button">
                     Start Your Journey <i class="ri-arrow-right-line"></i>
                  </a>
               </div>
               <div class="home__cards grid">
                  <article class="home__card">
                     <img src="assets/img/pexels-asad-photo-maldives-1287460.jpg" alt="home image" class="home__card-img"/>
                     <h4 class="home__card-title">Soneva Jani</h4>
                     <div class="home__card-shadow"></div>
                  </article> 
                  <article class="home__card">
                     <img src="assets/img/pexels-aleksandar-pasaric-2041556.jpg" alt="home image" class="home__card-img"/>
                     <h4 class="home__card-title">Burj Al Arab</h4>
                     <div class="home__card-title"></div>
                  </article> 
                  <article class="home__card">
                     <img src="assets/img/michael-m-JntqOdRO-rs-unsplash.jpg" alt="home image" class="home__card-img"/>
                     <h4 class="home__card-title">Bellagio</h4>
                     <div class="home__card-title"></div>
                  </article> 
                  <article class="home__card">
                     <img src="assets/img/pexels-michael-block-3225531.jpg" alt="home image" class="home__card-img"/>
                     <h3 class="home__card-title">Bulgari</h3>
                     <div class="home__card-title"></div>
                  </article> 
               </div> 
            </div>
         </section>

        {/*  <!--==================== ABOUT ====================--> */}
         <section class="about section" id="about">
            <div class="about__conmtainer container grid">
               <div class="about__data">
                  <h2 class="section__title">
                     Learn More About SuiteSpot
                  </h2>
                  <p class= "about__description">
                     Elevate your stay with a plethora of amenities catering to every desire. Indulge in tranquil spas, rejuvenating pools, exquisite dining venues, and seamless services that cater to your every need.
                     <br/><br/>
                     Step into a world where every horizon holds an invitation to explore, discover, and indulge.
                      Our curated travel experiences redefine wanderlust, offering a symphony of breathtaking landscapes, cultural immersion, and moments that resonate long after the journey ends.
                      
                  </p>
                  <a href="#explore" class="button">
                     Explore suiteSpot <i class="ri-arrow-right-line"></i>
                  </a>
               </div>
               <div class="about__image">
                  <img src="assets/img/about-beach.jpg" alt="about image" class="about__img"/>
                  <div class="about__shadow"></div>

               </div>
            </div>
         </section>

        {/*  <!--==================== POPULAR ====================--> */}
         <section class="popular section" id="popular">
            <h2 class="section__title">
               Enjoy The Beauty Of The World <br/> 
               With Our Most Popular Hotels
            </h2>
            <div class="popular__container container grid">
               <article class="popular__card">
                  <div class="popular__image">
                     <img src="assets/img/wallpaperflare.com_wallpaper.jpg" alt="popular image" class="popular__img"/>
                     <div class="popular__shadow"></div>
                  </div>
                  <h2 class="popular__title">
                     Grace Hotel
                  </h2>
                  <div class="popular__location">
                     <i class="ri-map-pin-line"></i>
                     <span>Santorini</span>
                  </div>
               </article>

               <article class="popular__card">
                  <div class="popular__image">
                     <img src="assets/img/rajvilas-gallery-featured-1-entrance-evening-724x407.jpg" alt="popular image" class="popular__img"/>
                     <div class="popular__shadow"></div>
                  </div>
                  <h2 class="popular__title">
                    The Oberoi Rajvilas
                  </h2>
                  <div class="popular__location">
                     <i class="ri-map-pin-line"></i>
                     <span>jaipur</span>
                  </div>
               </article>

               <article class="popular__card">
                  <div class="popular__image">
                     <img src="assets/img/184840635.jpg" alt="popular image" class="popular__img"/>
                     <div class="popular__shadow"></div>
                  </div>
                  <h2 class="popular__title">
                     Ice Hotel
                  </h2>
                  <div class="popular__location">
                     <i class="ri-map-pin-line"></i>
                     <span>Sweden</span>
                  </div>
               </article>
            </div>

         </section>
         
      {/*    <!--==================== Testimonials ====================--> */}
         <section class="explore section" id="explore">
            <div class="explore__container">
               <div class="explore__image">
                  <img src="assets/img/explore-beach.jpg" alt="explore image" class="explore__img"/>
                  <div class="explore__shadow"></div>
               </div>

                <div class="explore__content container grid">
                  <div class="explore__data">
                     <h2 class="section__title">
                        Testimonials
                     </h2>

                     <p class="explore__description">
                        Add description
                     </p>
                  </div>
                  <div class="explore__user">
                     <img src="assets/img/explore-perfil.png" alt="explore image" class="explore__perfil"/>
                     <span class="explore__name"> Ayush Shresth</span>
                  </div>
                </div>
            </div>
         </section>
         
         {/* <!--==================== JOIN ====================--> */}
         <section class="join section">
            <div class="join__container container grid"> 
               <div class="join__data">
                  <h2 class="section__title">
                     Your Journey <br/>
                     Begins Here
                  </h2>
                  <p class="join description">
                     add description
                  </p>
                 {/*  <!--Add a link to register page--> */}
               </div>
               <div class="join__image">
                  <img src="assets/img/join-island.jpg" alt="join image" class="join__img"/>
                  <div class="image__shadow"></div>
               </div>
            </div>
         </section>
      </main>


            {/*  <!--=============== SCROLLREVEAL ===============--> */}
            <script src="assets/js/scrollreveal.min.js"></script>

            {/* <!--=============== MAIN JS ===============--> */}
            <script src="assets/js/main.js"></script>
        </div>
        );
    }
}

export default Home;
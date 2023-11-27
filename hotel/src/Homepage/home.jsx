import React from "react";
import Reveal from "react-reveal/Reveal";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
class Home extends React.Component {
  render() {
    return (
      <div>
        {/* <!--==================== MAIN ====================--> */}
        <main class="main">
          {/* <!--==================== HOME ====================--> */}
          <section class="home section" id="home">
            <img
              src="assets/img/3914367.jpg"
              alt="home image"
              class="home__bg"
            />
            <div class="home__shadow"></div>

            <div class="home__container container grid">
              <div class="home__data">
                <h3
                  class="home__subtitle"
                  style={{ "text-align": "left", "margin-left": "20px" }}
                >
                  Welcome To LikeHome
                </h3>
                <p style={{ "margin-left": "20px" }}>powered by SuiteSpot</p>
                <h1 class="home__title">
                  Explore <br />
                  The World
                </h1>
                <p class="home__description">
                  Live the trips exploring the world, discover paradises,
                  islands, mountains and much more, get your hotel now.
                </p>
                <a href="/search" class="button">
                  Start Your Journey <i class="ri-arrow-right-line"></i>
                </a>
              </div>

              <div class="home__cards grid">
                <article class="home__card">
                  <img
                    src="assets/img/pexels-asad-photo-maldives-1287460.jpg"
                    alt="home image"
                    class="home__card-img"
                  />
                  <h4 class="home__card-title">Soneva Jani</h4>
                  <div class="home__card-shadow"></div>
                </article>
                <article class="home__card">
                  <img
                    src="assets/img/pexels-aleksandar-pasaric-2041556.jpg"
                    alt="home image"
                    class="home__card-img"
                  />
                  <h4 class="home__card-title">Burj Al Arab</h4>
                  <div class="home__card-title"></div>
                </article>
                <article class="home__card">
                  <img
                    src="assets/img/michael-m-JntqOdRO-rs-unsplash.jpg"
                    alt="home image"
                    class="home__card-img"
                  />
                  <h4 class="home__card-title">Bellagio</h4>
                  <div class="home__card-title"></div>
                </article>
                <article class="home__card">
                  <img
                    src="assets/img/pexels-michael-block-3225531.jpg"
                    alt="home image"
                    class="home__card-img"
                  />
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
                <h2 class="section__title">Learn More About LikeHome</h2>
                <p class="about__description">
                  Elevate your stay with a plethora of amenities catering to
                  every desire. Indulge in tranquil spas, rejuvenating pools,
                  exquisite dining venues, and seamless services that cater to
                  your every need.
                  <br />
                  <br />
                  Step into a world where every horizon holds an invitation to
                  explore, discover, and indulge. Our curated travel experiences
                  redefine wanderlust, offering a symphony of breathtaking
                  landscapes, cultural immersion, and moments that resonate long
                  after the journey ends.
                </p>
                <a href="#explore" class="button">
                  Explore LikeHome <i class="ri-arrow-right-line"></i>
                </a>
              </div>
              <div class="about__image">
                <img
                  src="assets/img/about-beach.jpg"
                  alt="about image"
                  class="about__img"
                />
                <div class="about__shadow"></div>
              </div>
            </div>
          </section>

          {/*  <!--==================== POPULAR ====================--> */}
          <section class="popular section" id="popular">
            <h2 class="section__title">
              Enjoy The Beauty Of The World <br />
              With Our Most Popular Hotels
            </h2>
            <div class="popular__container container grid">
              <article class="popular__card">
                <div class="popular__image">
                  <img
                    src="assets/img/wallpaperflare.com_wallpaper.jpg"
                    alt="popular image"
                    class="popular__img"
                  />
                  <div class="popular__shadow"></div>
                </div>
                <h2 class="popular__title">Grace Hotel</h2>
                <div class="popular__location">
                  <i class="ri-map-pin-line"></i>
                  <span>Santorini</span>
                </div>
              </article>

              <article class="popular__card">
                <div class="popular__image">
                  <img
                    src="assets/img/rajvilas-gallery-featured-1-entrance-evening-724x407.jpg"
                    alt="popular image"
                    class="popular__img"
                  />
                  <div class="popular__shadow"></div>
                </div>
                <h2 class="popular__title">The Oberoi Rajvilas</h2>
                <div class="popular__location">
                  <i class="ri-map-pin-line"></i>
                  <span>jaipur</span>
                </div>
              </article>

              <article class="popular__card">
                <div class="popular__image">
                  <img
                    src="assets/img/184840635.jpg"
                    alt="popular image"
                    class="popular__img"
                  />
                  <div class="popular__shadow"></div>
                </div>
                <h2 class="popular__title">Ice Hotel</h2>
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
                <img
                  src="assets/img/explore-beach.jpg"
                  alt="explore image"
                  class="explore__img"
                />
                <div class="explore__shadow"></div>
              </div>

              <div class="explore__content container grid">
                <div class="explore__data">
                  <h2 class="section__title">Testimonials</h2>

                  <p class="explore__description">
                    I recently stayed at Grace Hotel and it was superb! The room
                    was stylish, cozy, and spotless. The staff was incredibly
                    friendly and went out of their way to make my stay special.
                    The central location made it easy to explore the city, and
                    the on-site dining was top-notch. Can't wait to return!
                    Highly recommend.
                  </p>
                </div>
                <div class="explore__user">
                  <img
                    src="assets/img/explore-perfil.png"
                    alt="explore image"
                    class="explore__perfil"
                  />
                  <span class="explore__name"> Ayush Shresth</span>
                </div>

                <div class="explore__data">
                  <p class="explore__description">
                    I recently had the pleasure of staying at Hilton in
                    Barcelona, and I can't say enough good things about it. The
                    hotel is absolutely stunning, with a beautiful lobby,
                    elegant rooms, and a rooftop pool with breathtaking views of
                    the city. But what really sets [Hotel Name] apart is its
                    amazing staff. Everyone from the front desk to the
                    housekeeping staff was so friendly and helpful. They went
                    above and beyond to make sure my stay was perfect.
                  </p>
                </div>
                <div class="explore__user">
                  <img
                    src="assets/img/explore-perfil.png"
                    alt="explore image"
                    class="explore__perfil"
                  />
                  <span class="explore__name"> Adam Sandler</span>
                </div>

                <div class="explore__data">
                  <p class="explore__description">
                    Stepping into the Icehotel is like entering a world of
                    dreams, a place where ice and art intertwine to create an
                    unforgettable experience. From the moment you arrive, you're
                    greeted by the hotel's iconic ice sculptures, each one a
                    masterpiece of creativity and craftsmanship. The hotel's
                    rooms and suites are all made of ice, and they offer a
                    unique and cozy way to experience the Swedish winter.{" "}
                  </p>
                </div>
                <div class="explore__user">
                  <img
                    src="assets/img/explore-perfil.png"
                    alt="explore image"
                    class="explore__perfil"
                  />
                  <span class="explore__name"> Megan Fox</span>
                </div>
              </div>
            </div>
          </section>

          {/* <!--==================== JOIN ====================--> */}
          <section class="join section">
            <div class="join__container container grid">
              <div class="join__data">
                <h2 class="section__title">
                  Your Journey <br />
                  Begins Here
                </h2>
                <p class="join description">
                  Embark on an unforgettable adventure with our thrilling
                  vacation package! Dive into the heart of nature's wonders,
                  exploring breathtaking landscapes and discovering hidden gems.
                  From adrenaline-pumping activities like zip-lining through
                  lush canopies to serene moments under starlit skies, this
                  vacation is crafted for the bold and the curious. Unleash your
                  inner adventurer, create lasting memories, and return home
                  with tales of epic experiences. Dare to dream, dare to
                  explore—your adventure awaits!
                </p>
                {/*  <!--Add a link to register page--> */}
              </div>
              <div class="join__image">
                <img
                  src="assets/img/join-island.jpg"
                  alt="join image"
                  class="join__img"
                />
                <div class="image__shadow"></div>
              </div>
            </div>
          </section>
        </main>

        {/*  <!--=============== SCROLLREVEAL ===============--> */}
        <script src="hotel/src/Homepage/scrollreveal.min.js"></script>

        {/* <!--=============== MAIN JS ===============--> */}
        <script src="hotel/src/Homepage/main.js"></script>
      </div>
    );
  }
}

export default Home;
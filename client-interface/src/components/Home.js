import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

export default function Home() {

  const navigate = useNavigate();
  const goToOrders = (e) => {
    e.preventDefault();
    navigate('/orders');
  }
  
    return(
        <div>
            <div>
                <div style={{backgroundColor: 'yellow', width: '100%', padding: '2px 0px'}}>
                  <h1 style={{padding: '10px 0px', marginBottom: '2px'}}>Welcome to Our Restaurant</h1>
                  <p style={{fontSize: '32px', marginTop: '2px'}}><b>Anatantara</b></p>
                </div>

              <div className="presentation">

                <div className="left">
                  <iframe
                  width="560"
                  height="350"
                  src="https://www.youtube.com/embed/yW3z0ZEl3WA?autoplay=1&mute=1" 
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                </div>

                <div className="right">
                  <h2>Desert Restaurant</h2>
                  <p>
                    Experience a unique fusion of modern and traditional dishes, where the flavors of the past meet contemporary culinary creativity. 
                    Whether you're craving classic local dishes or something innovative, we have something for everyone.
                  </p>
                  <h3 style={{marginBottom: '0px', marginTop: '0px'}}>What We Offer:</h3>
                  <h4 style={{marginBottom: '0px', marginTop: '0px'}}>Traditional Foods</h4>
                  <p style={{marginBottom: '0px', marginTop: '0px'}}>
                    Savor the taste of time-honored recipes passed down through generations.
                  </p>
                  <h4 style={{marginBottom: '0px', marginTop: '0px'}}>Modern Cuisine</h4>
                  <p style={{marginBottom: '0px', marginTop: '0px'}}>
                    Indulge in modern culinary innovations with fresh, contemporary twists.
                  </p>
                  <h4 style={{marginBottom: '0px', marginTop: '0px'}}>Refreshing Drinks</h4>
                  <p style={{marginBottom: '0px', marginTop: '0px'}}>
                    Enjoy a variety of traditional and modern beverages, from refreshing juices to unique cocktails.
                  </p>
                </div>

              </div>

            </div>

            

            <form onSubmit={goToOrders}>
              <label htmlFor="myBtn">
                <div className="home-btn">
                <button id="myBtn" className="go-btn" onClick={goToOrders}>Go To Lists</button>
              </div>
              </label>
              
            </form>
        </div>
    );
}
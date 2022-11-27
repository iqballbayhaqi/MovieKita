import React, { useEffect, useState } from "react";
import { apiHost, apiImg } from "../Helpers/api";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Components/slider.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";

const StyledPopup = styled(Popup)`
  // use your custom style for ".popup-overlay"
  &-overlay {
    ...;
  }
  // use your custom style for ".popup-content"
  &-content {
    padding: 0px;
    border: 0px;
    height: 500px;
  }
`;

const ImageItemVideo = styled.img`
  margin-right: 20px;
  object-fit: cover;
  cursor: pointer;
`;

const Modal = ({ data }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <StyledPopup
      trigger={
        <ButtonPlay>
          <i class="fa fa-play" aria-hidden="true"></i>
        </ButtonPlay>
      }
      modal
      closeOnDocumentClick
      onClose={() => setSelectedVideo(null)}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${selectedVideo ||
          data[0].key}?loop=1&controls=1&autoplay=1&showinfo=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay;"
        style={{
          border: 0,
        }}
        allowfullscreen
      ></iframe>

      <div style={{ margin: "0 10px 20px 0" }}>
        {data.map((res) => (
          <ImageItemVideo
            key={res.key}
            onClick={() => setSelectedVideo(res.key)}
            src={`https://img.youtube.com/vi/${res.key}/0.jpg`}
            height={100}
            width={150}
          />
        ))}
      </div>
    </StyledPopup>
  );
};

const Home = () => {
  const [dataMovie, setDataMovie] = useState({
    movies: [],
    loading: false,
    error: null,
    page: 1,
    totalresult: null,
  });
  const [selectedMovie, setSelectedMovie] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDataApi = (page = 1) => {
      fetch(
        `${apiHost}/trending/movie/day?api_key=0325b4988316cbf381d422df2916c1c2`
      )
        .then((res) => res.json())
        .then((res) => {
          setDataMovie({
            movies: dataMovie.movies.concat(res.results),
            error: null,
            totalresult: res.total_results,
            page: res.page,
          });

          return res;
        })
        .then((data) => {
          fetch(
            `${apiHost}/movie/${data.results[0].id}?api_key=0325b4988316cbf381d422df2916c1c2&append_to_response=videos`
          )
            .then((res) => res.json())
            .then((res) => {
              if (res) {
                setSelectedMovie(res);
              }
            });
        });
    };

    fetchDataApi();
  }, []);

  const switchSelectedMovie = (id) => {
    fetch(
      `${apiHost}/movie/${id}?api_key=0325b4988316cbf381d422df2916c1c2&append_to_response=videos`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setSelectedMovie(res);
        }
      })
      .then(() =>
        setTimeout(() => {
          window.scroll({ top: 0, left: 0, behavior: "smooth" });
        }, 500)
      );
  };

  const loadMoreData = () => {
    setLoading(true);
    fetch(
      `${apiHost}/trending/movie/day?api_key=0325b4988316cbf381d422df2916c1c2&page=${dataMovie.page +
        1}`
    )
      .then((res) => res.json())
      .then((res) => {
        setDataMovie({
          movies: dataMovie.movies.concat(res.results),
          error: null,
          totalresult: res.total_results,
          page: res.page,
        });
      })
      .then(() => setLoading(false));
  };

  const settings = {
    dots: false,
    autoplay: false,
    infinite: false,
    slidesToShow: 8,
    swipeToSlide: true,
  };

  return (
    <>
      {selectedMovie && (
        <Container
          style={{
            backgroundImage: `url("${apiImg}${selectedMovie.poster_path}")`,
          }}
        >
          <Content>
            <Title>{selectedMovie.title}</Title>
            <SubTitle style={{ opacity: !selectedMovie.tagline && 0 }}>
              {selectedMovie.tagline || "-"}
            </SubTitle>
            <StarContainer>
              {[1, 2, 3, 4, 5].map((res) => {
                if (res < Math.ceil(Number(selectedMovie.vote_average) / 2)) {
                  return (
                    <ActiveStar>
                      <i class="fa fa-star" aria-hidden="true"></i>
                    </ActiveStar>
                  );
                } else {
                  return (
                    <NonActiveStar>
                      <i class="fa fa-star-o" aria-hidden="true"></i>
                    </NonActiveStar>
                  );
                }
              })}
              <TotalAverage>{selectedMovie.vote_average}</TotalAverage>
            </StarContainer>
            <CategoryContainer>
              {selectedMovie.genres.map((res, idx) => {
                if (idx === selectedMovie.genres.length - 1) {
                  return <Category>{res.name}</Category>;
                } else {
                  return (
                    <>
                      <Category>{res.name}</Category>
                      <Separator>|</Separator>
                    </>
                  );
                }
              })}
            </CategoryContainer>
            <Status>{`${selectedMovie.status} ${selectedMovie.release_date}`}</Status>
            <ActionContainer>
              {selectedMovie.videos.results.length !== 0 && (
                <Modal data={selectedMovie.videos.results} />
              )}
              <a href={selectedMovie.homepage} target="_blank">
                <ButtonAdd>
                  <i class="fa fa-film" aria-hidden="true"></i>
                </ButtonAdd>
              </a>
            </ActionContainer>

            <div>
              <WhatsappShareButton url={window.location.href}>
                <WhatsappIcon
                  size={32}
                  round={true}
                  style={{ marginRight: 5 }}
                />
              </WhatsappShareButton>
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon
                  size={32}
                  round={true}
                  style={{ marginRight: 5 }}
                />
              </FacebookShareButton>
              <TwitterShareButton url={window.location.href}>
                <TwitterIcon
                  size={32}
                  round={true}
                  style={{ marginRight: 5 }}
                />
              </TwitterShareButton>
              <LineShareButton>
                <LineIcon size={32} round={true} style={{ marginRight: 5 }} />
              </LineShareButton>
              <TelegramShareButton>
                <TelegramIcon size={32} round={true} />
              </TelegramShareButton>
            </div>

            <DescriptionContainer>
              {[`${selectedMovie.overview}`].map(
                (desc, index) =>
                  !desc.includes("N/A") && <Desc key={index}>{desc}</Desc>
              )}
            </DescriptionContainer>

            <div>
              {selectedMovie.production_companies.map((res) => {
                if (res.logo_path) {
                  return (
                    <ImgProduction
                      key={res.id}
                      src={`${apiImg}${res.logo_path}`}
                      alt={res.name}
                    />
                  );
                }
              })}
            </div>

            <SliderWrapper>
              <SliderTitle>TRENDING</SliderTitle>
              <Slider {...settings}>
                {dataMovie.movies.map((res) => {
                  return (
                    <ScrollItemWrapper id={res.id}>
                      <div onClick={() => switchSelectedMovie(res.id)}>
                        <ScrollItemImage
                          src={`${apiImg}${res.poster_path}`}
                          alt={res.title}
                          style={{
                            transform:
                              selectedMovie.id === res.id && `scale(1.2)`,
                          }}
                        />
                        {/* {selectedMovie.id !== res.id && (
                          <ScrollItemText>{res.title}</ScrollItemText>
                        )} */}
                      </div>
                    </ScrollItemWrapper>
                  );
                })}

                <div onClick={loadMoreData}>
                  <PlusItem>
                    {loading ? (
                      <div class="lds-facebook">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ) : (
                      <p>Load More</p>
                    )}
                  </PlusItem>
                </div>
              </Slider>
            </SliderWrapper>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  background-image: url("https://flxt.tmsimg.com/assets/p17580186_b_v13_ab.jpg");
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: right;
  height: 100vh;
  background-position-y: top;
  box-shadow: 10px 10px 5px #ccc;
  -moz-box-shadow: 10px 10px 5px #ccc;
  -webkit-box-shadow: 10px 10px 5px #ccc;
  -khtml-box-shadow: 10px 10px 5px #ccc;
  -webkit-transition: background-image 0.2s ease-in-out;
  transition: background-image 0.2s ease-in-out;
`;

const Content = styled.div`
  padding: 60px;
  background-image: url("/images/background.png");
  background-size: cover;
  background-position-y: -65px;
  height: 100vh;
`;

const Title = styled.h1`
  margin: 0px;
  font-size: 3rem;
  background: #c7c7c7;
  background: linear-gradient(to top, #c7c7c7 0%, #ffffff 43%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 50%;
  transition: all 500ms ease-in-out;
`;

const SubTitle = styled.p`
  color: #ffffff;
`;

const ScrollItemText = styled.p`
  color: #ffffff;
  width: 150px;
`;

const StarContainer = styled.div`
  margin: 15px 0px;
  display: flex;
  align-items: baseline;
`;

const ActiveStar = styled.i`
  color: #ffba00;
  font-size: 25px;
  margin-right: 5px;
`;

const NonActiveStar = styled.i`
  color: #9a9a9a;
  font-size: 25px;
  margin-right: 5px;
`;

const CategoryContainer = styled.div`
  display: flex;
`;

const Separator = styled.p`
  margin: 0px 10px;
  color: #333333;
`;

const Category = styled.p`
  color: #9a9a9a;
`;

const ActionContainer = styled.div`
  margin: 30px 0px;
`;

const DescriptionContainer = styled.div`
  width: 50%;
  color: #ffffff;
  height: 300px;
`;

const ButtonPlay = styled.button`
  padding: 15px 20px;
  background-color: #104847;
  color: #ffffff;
  border: 0px;
  cursor: pointer;
`;

const ButtonAdd = styled.button`
  padding: 15px 20px;
  background-color: #13c6b3;
  color: #ffffff;
  border: 0px;
  transform: scale(1.05);
  cursor: pointer;
`;

const ScrollItemWrapper = styled.div`
  display: flex !important;
  justify-content: center;
  cursor: pointer;
`;

const ScrollItemImage = styled.img`
  height: 200px !important;
  width: 150px !important;
  transition: all 0.2s ease-in-out;
`;

const TotalAverage = styled.p`
  color: #ffffff;
`;

const Desc = styled.p`
  margin: 10px 0px;
`;

const SliderWrapper = styled.div`
  padding: 40px 0px;
`;

const SliderTitle = styled.h2`
  color: #ffffff;
`;

const ImgProduction = styled.img`
  height: 50px;
  margin-right: 20px;
`;

const PlusItem = styled.div`
  height: 200px;
  background-color: #454545;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
`;

const Status = styled.p`
  color: #9a9a9a;
  border-top: 1px solid #333333;
  margin-top: 10px;
  padding-top: 5px;
  width: 200px;
`;

export default Home;

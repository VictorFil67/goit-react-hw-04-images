import { useEffect, useState } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { getImages } from '../../API/gallery';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import s from './ImageGallery.module.css';

// import React from 'react'

export const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  // const [per_page, setPer_page] = useState(12);
  const [q, setQ] = useState('');
  // const [totalHits, setTotalHits] = useState(null);
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState(null);

  // useEffect(() => {}, []);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { hits } = q
          ? await getImages({
              q,
              // per_page,
              page: 1,
            })
          : // this.setState({ images: hits, totalHits });
            await getImages({
              // per_page,
              page,
            });
        setImages(prev => [...prev, ...hits]);
        // setTotalHits(totalHits);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (q) {
      getData();
    }
  }, [page, q]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       setIsLoading(true);
  //       // const { hits } =
  //       await getImages({
  //         q,
  //         per_page,
  //         page: 1,
  //       });
  //       setImages(hits);
  //       setPage(1);
  //     } catch (error) {
  //       setError(error.message);
  //       // console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  // }, [q]);

  //   async componentDidUpdate(_, prevState) {mm
  //   // const { per_page } = this.state;
  //   if (prevState.q === this.state.q && prevState.page !== this.state.page) {
  //     try {
  //       this.setState({ isLoading: true });
  //       const { hits, totalHits } = await getImages({
  //         q: this.state.q,
  //         per_page,
  //         page: this.state.page,
  //       });
  //       // this.setState({ images: hits, totalHits });
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...hits],
  //         totalHits,
  //       }));
  //     } catch (error) {
  //       console.log(error.message);
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   } else if (
  //     prevState.q !== this.state.q
  //     // prevState.page !== this.state.page
  //     // (this.state.q && prevState.page !== this.state.page)
  //   ) {
  //     try {
  //       this.setState({ isLoading: true });
  //       const { hits } = await getImages({
  //         q: this.state.q,
  //         per_page,
  //         page: 1,
  //       });
  //       this.setState({ images: hits, page: 1 });
  //     } catch (error) {
  //       console.log(error.message);
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

  const handleSearchText = text => {
    // this.setState({ q: text, images: [], page: 1 });
    setQ(text);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = e => {
    // this.setState(prevState => ({ page: prevState.page + 1 }));
    setPage(prev => prev + 1);
  };

  const openModal = url => {
    // this.setState({ url, modal: true });
    setUrl(url);
    setModal(true);
    window.addEventListener('keydown', onWindowEscape);
  };
  const onWindowEscape = e => {
    // console.log(e.code);
    if (e.code === 'Escape') {
      closeModal();
      window.removeEventListener('keydown', onWindowEscape);
    }
  };
  const closeModal = () => {
    // this.setState({ modal: false });
    setModal(false);
  };

  return (
    <div>
      {modal && <Modal url={url} close={closeModal} />}
      {error && <h1>{error}</h1>}
      <Searchbar onSubmit={handleSearchText} />
      {isLoading && <Loader />}
      <ul className={s.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            previewURL={image.previewURL}
            tags={image.tags}
            url={image.largeImageURL}
            openModal={openModal}
          />
        ))}
      </ul>
      {images.length >= 12 && <Button handleLoadMore={handleLoadMore} />}
    </div>
  );
};

// export class ImageGallery extends Component {
//   state = {
//     images: [],
//     isLoading: false,
//     error: null,
//     page: 1,
//     per_page: 12,
//     q: '',
//     totalHits: null,
//     modal: false,
//     url: null,
//   };

//   async componentDidMount() {
//     // const { per_page, q, page } = this.state;
//     // try {
//     //   this.setState({ isLoading: true });
//     // const { hits, totalHits } = await getImages({ q, per_page, page });
//     // this.setState({ images: hits, totalHits });
//     // console.log(this.state.images[0].previewURL);
//     // console.log(this.state.images[0].tags);
//     // } catch (error) {
//     //   console.log(error.message);
//     // } finally {
//     //   this.setState({ isLoading: false });
//     // }
//   }

//   async componentDidUpdate(_, prevState) {
//     const { per_page } = this.state;
//     if (prevState.q === this.state.q && prevState.page !== this.state.page) {
//       try {
//         this.setState({ isLoading: true });
//         const { hits, totalHits } = await getImages({
//           q: this.state.q,
//           per_page,
//           page: this.state.page,
//         });
//         // this.setState({ images: hits, totalHits });
//         this.setState(prevState => ({
//           images: [...prevState.images, ...hits],
//           totalHits,
//         }));
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     } else if (
//       prevState.q !== this.state.q
//       // prevState.page !== this.state.page
//       // (this.state.q && prevState.page !== this.state.page)
//     ) {
//       try {
//         this.setState({ isLoading: true });
//         const { hits } = await getImages({
//           q: this.state.q,
//           per_page,
//           page: 1,
//         });
//         this.setState({ images: hits, page: 1 });
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   handleSearchText = text => {
//     this.setState({ q: text, images: [], page: 1 });
//   };

//   handleLoadMore = e => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   openModal = url => {
//     this.setState({ url, modal: true });
//     window.addEventListener('keydown', this.onWindowEscape);
//   };
//   onWindowEscape = e => {
//     // console.log(e.code);
//     if (e.code === 'Escape') {
//       this.closeModal();
//       window.removeEventListener('keydown', this.onWindowEscape);
//     }
//   };
//   closeModal = () => {
//     this.setState({ modal: false });
//   };

//   render() {
//     const { images, isLoading, url, per_page } = this.state;
//     return (
//       <div>
//         {this.state.modal && <Modal url={url} close={this.closeModal} />}
//         <Searchbar onSubmit={this.handleSearchText} />
//         {isLoading && (
//           <Loader />
//           // <Audio
//           //   height="80"
//           //   width="80"
//           //   radius="9"
//           //   color="green"
//           //   ariaLabel="three-dots-loading"
//           //   // wrapperStyle
//           //   // wrapperClass
//           // />
//         )}
//         <ul className={s.ImageGallery}>
//           {images.map(image => (
//             <ImageGalleryItem
//               key={image.id}
//               previewURL={image.previewURL}
//               tags={image.tags}
//               url={image.largeImageURL}
//               openModal={this.openModal}
//             />
//           ))}
//         </ul>

//         {images.length >= per_page && (
//           <Button handleLoadMore={this.handleLoadMore} />
//         )}
//       </div>
//     );
//   }
// }
// || (images.length >= per_page && page === +1)

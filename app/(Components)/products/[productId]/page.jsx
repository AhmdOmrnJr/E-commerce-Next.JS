import fetchData from '@/app/Hooks/UseGetApi';

export default async function ProductDetails({ params }) {

    const productId = params.productId

    const { data: productDetails, error, loading: productsLoading } = await fetchData(`products/${productId}`)
    console.log(productDetails);
    return <>

        {productsLoading ?
            <div className='vh-100 d-flex justify-content-center align-items-center my-5 py-5'>
                <i className='fas fa-spin fa-spinner fa-2x'></i>
            </div>
            : <>
                <div className='row vh-100 justify-content-center align-items-center'>
                    <div className='col-md-4'>

                        <div id="carouselExampleIndicators" className="carousel carousel-dark slide">
                            <div className="carousel-indicators">
                                {productDetails.images.map((image, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to={index}
                                        className={index === 0 ? 'active' : ''}
                                        aria-current={index === 0 ? 'true' : ''}
                                        aria-label={`Slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                            <div className="carousel-inner">
                                {productDetails.images.map((image, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <img src={image} className="d-block w-100" alt={`product-image-${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                    </div>
                    <div className='col-md-8'>
                        <h2 className='mt-2'>{productDetails?.title}</h2>
                        <h5 className='font-sm text-main mt-2'>{productDetails?.category?.name}</h5>
                        <p className='mt-2'>{productDetails?.description}</p>
                        <p className='d-flex justify-content-between'>
                            <span>{productDetails?.price} EGP</span>
                            <span>
                                <i className='fas fa-star rating-color me-1'></i>
                                {productDetails?.ratingsAverage}
                            </span>
                        </p>
                        <button className='btn bg-main w-100 text-white'>Add to cart</button>
                    </div>
                </div>
            </>
        }
    </>

}

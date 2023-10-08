import RingLoader from 'react-spinners/RingLoader';

const Spinner = () => {
  return (
    <>
    <div className="loader-container">
    <RingLoader
    color="#36d7b7"
    size={200}
    />
    <h4 className="mt-5">Connecting To Server.. Please Wait..</h4>
    </div>
    </>
  )
}

export default Spinner;
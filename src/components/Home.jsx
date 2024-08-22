import React, { useState } from 'react'
import axios from "axios";
import PieChart from '../components/PieChart';
import img from '../assets/bghome.jpg'


function Home() {
    const [product, setProduct] = useState('');
    const [output, setOutput] = useState({});
    const [refreshChart, setRefreshChart] = useState(false);

  const handleOnJoin = async () => {
    try {
      const response = await axios.post('http://localhost:5500/get_output', { product });
      setOutput(response.data);
      setRefreshChart(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleInputChange = (e) => {
    setProduct(e.target.value);
    setRefreshChart(false); // Set refreshChart to false on every input change
  };
    return (
        <> 
        <div className='bg-[#C3B2FF]'>

        <div className="w-screen h-screen bg-no-repeat bg-contain" style={{ backgroundImage: `url(${img})` }}>
        {/* <div >
          <img src={img} width={600} alt='img'></img>
        </div> */}
        <div className='flex flex-row float-right ml-96 mr-40'>
        <div className='bg-[#ffffff52] px-20 text-xl py-10 font-serif font-semibold shadow-xl'>
          <h5 className='text-purple-800'> Enter Name of the Product: </h5> <br />
        <input type="text" value={product} placeholder='Name' onChange={e => setProduct(e.target.value)} className='bg-purple-300 text-black  border-2 border-purple-700 text-lg p-2 mb-8 w-96 rounded-lg focus:outline-none ' onChange={handleInputChange} />
<br />
<input type='button' value='Submit' className="bg-gradient-to-r from-purple-800 to-white-400 text-xl px-20 py-3 font-bold my-12 rounded-lg border-2 border-purple-800 text-black shadow-xl cursor-pointer hover:shadow-[#9e9e9e] hover:bg-[#000000] hover:text-white text-center ml-20" onClick={handleOnJoin} />
<div>
        {/* <p>True Percent: {output.True_percent}</p>
        <p>False Percent: {output.False_percent}</p> */}
        <div>
        {output.True_percent !== undefined && output.False_percent !== undefined && (
              <PieChart data={[output.True_percent, output.False_percent]} refreshChart={refreshChart} />
            )}
              </div>
</div>
</div>
</div>
</div>
</div>
        
      
  </>
  )
}

export default Home;
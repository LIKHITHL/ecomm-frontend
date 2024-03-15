import React from 'react'
import Layout from "../../components/layout/Layout";
import Searchinput from './Searchinput';

const Searching = () => {
    return (
        <Layout title="Search A Product -- shopping">
            <div className='m-5 p-5 d-grid g-2'>
                <Searchinput />
            </div>
        </Layout>
    )
}

export default Searching
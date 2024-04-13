/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRowContainer from '@crema/components/AppRowContainer';
import AppAnimate from '@crema/components/AppAnimate';
import { Col } from 'antd';
import AppLoader from '@crema/components/AppLoader';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'


const queryClient = new QueryClient()


function TestData() {
  let endpoint=import.meta.env.VITE_ENGINE9_DATA_ENDPOINT;
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios
        .get(endpoint+"/tables/person")
        .then((res) => res.data),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>Sample</h1>
      <p>{JSON.stringify(data)}</p>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>    
      <AppAnimate animation='transition.slideUpIn' delay={200}>
      <AppRowContainer delay={150}>
        <Col xs={24} lg={16} key={'a'}>
          <TestData/>
        </Col>
      </AppRowContainer>
    </AppAnimate>
    </QueryClientProvider>
  )
}


'use client'
import { useEffect } from 'react';

export default function UseBootstrap () {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return <></>

};



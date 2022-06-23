import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import {   Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,} from '@chakra-ui/react'


import Web3Modal from 'web3modal'

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function TxnData(nft) {




  
 
 
 


  return (
    <div >
  
  <TableContainer>
          <Table size='md'>
            <Thead>
              <Tr>
                <Th>event</Th>
                <Th>price</Th>
                <Th>from</Th>
                <Th>to</Th>
                <Th>date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>listed</Td>
                <Td>0.005</Td>
                <Td isTruncated>{nft.owner}</Td>
                <Td>marketplace</Td>
                <Td>10/2/2022</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

    </div>
  )
}
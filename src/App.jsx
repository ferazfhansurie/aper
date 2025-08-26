import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./components/Dashboard";
import AIResearchAssistant from "./components/AIResearchAssistant";
import Presentation from "./components/Presentation";
import Funds from "./components/Funds";
import Investors from "./components/Investors";
import Companies from "./components/Companies";
import Valuations from "./components/Valuations";
import Countries from "./components/Countries";
import Regions from "./components/Regions";
import CrossBorder from "./components/CrossBorder";
import Industries from "./components/Industries";
import Technology from "./components/Technology";
import Healthcare from "./components/Healthcare";
import RealEstate from "./components/RealEstate";
import FundCompanyLinks from "./components/FundCompanyLinks";
import InvestorFundLinks from "./components/InvestorFundLinks";
import DealParticipants from "./components/DealParticipants";
import AffiliateNetworks from "./components/AffiliateNetworks";
import HierarchicalDemo from "./components/HierarchicalDemo";
import Deals from "./components/Deals";
import QueryEditor from "./components/QueryEditor";

const MotionBox = motion(Box);

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box bg="white" minH="100vh">
                  <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/research-ai" element={<AIResearchAssistant />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/companies" element={<Companies />} />
            <Route path="/valuations" element={<Valuations />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/cross-border" element={<CrossBorder />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/healthcare" element={<Healthcare />} />
            <Route path="/real-estate" element={<RealEstate />} />
            <Route path="/fund-company-links" element={<FundCompanyLinks />} />
            <Route path="/investor-fund-links" element={<InvestorFundLinks />} />
            <Route path="/deal-participants" element={<DealParticipants />} />
            <Route path="/affiliate-networks" element={<AffiliateNetworks />} />
            <Route path="/hierarchical-demo" element={<HierarchicalDemo />} />
            <Route path="/query-editor" element={<QueryEditor />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;

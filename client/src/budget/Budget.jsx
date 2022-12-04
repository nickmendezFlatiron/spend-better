import React, {useState} from 'react'

import BudgetDonutChart from '../dashboard/BudgetDonutChart';
import TitleDateRange from '../dashboard/widgets/TitleDateRange';
import GoalsCard from './GoalsCard';
import GoalForm from './GoalForm';

import CreditCardCollapse from './CreditCardCollapse';
import AccountSummaryCard from './AccountSummaryCard';
import BudgetProgress from './BudgetProgress';

import TransactionFilters from '../transactions/TransactionFilters';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import 'react-circular-progressbar/dist/styles.css';

const Budget = () => {
  const [timeFrame, setTimeFrame] = useState("Month")
  const [selectedCategory, setSelectedCategory] = useState('all');
  const data = {
    budget: 2000,
    expenses: 1233
  }
  const budgetAmount = <small className="text-muted">Amount</small>
  const percentage = parseInt(data.expenses / data.budget * 100)

  return (
    <div className='bg-dark text-light vh-85'>
      <Container className='pb-4'>
        <TitleDateRange timeFrame={timeFrame} selectedCategory={selectedCategory} setTimeFrame={setTimeFrame}/>
        <Row xs={1} md={2} className="bg-black p-2 rounded text-center">
          <Col  className=''>
            <BudgetDonutChart />
          </Col>
          <Col  className=''>
            <Row>
              Category breakdown and chart legend here
            </Row>
          </Col>
        </Row>
        <Row xs={1} lg={2} className='bg-black mt-2 py-2 rounded rounded-3'>
          <Col className="">
            <BudgetProgress data={data}>
              <div className='d-flex justify-content-between align-items-center'>
                <h2 className='text-warning'>
                  Budget 
                  <small className='text-secondary fw-light '> {timeFrame}</small>
                  </h2>
                <Button 
                  className='ms-auto mt-1 mb-3 me-1'
                  variant='outline-primary'  
                  size="sm"
                >
                    Edit
                </Button>
                <h3 className='text-secondary'>${data.budget}</h3>
                
              </div>
            </BudgetProgress>
            <div className=''>
              <CreditCardCollapse>
                <Row xs={1} lg={2} className="g-2 credit-card-container">
                  <AccountSummaryCard />
                  <AccountSummaryCard />
                  <AccountSummaryCard />
                  <AccountSummaryCard />
                  <AccountSummaryCard />
                  <AccountSummaryCard />
                </Row>
              </CreditCardCollapse>
            </div>
          </Col>
          <div>
            <GoalForm />   
            <Col className="goal-container">
              <GoalsCard />
              <GoalsCard />
              <GoalsCard />
              <GoalsCard />
              <GoalsCard />
              <GoalsCard />
              <GoalsCard />
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default Budget
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';

const PaymentVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying payment... Please do not close this window.');
  const hasVerified = useRef(false);

  useEffect(() => {
    // Prevent strict mode double-firing
    if (hasVerified.current) return;
    hasVerified.current = true;

    const reference = searchParams.get('reference');
    const courseId = searchParams.get('course_id');
    const userId = searchParams.get('user_id');

    if (!reference || !courseId || !userId) {
      setStatus('Invalid payment callback parameters. Missing reference or course data.');
      return;
    }

    const verifyTransaction = async () => {
      try {
        const paystackSecret = import.meta.env.VITE_PAYSTACK_SECRET_KEY;
        
        // Proxy call to Paystack verify endpoint
        const response = await fetch(`/paystack/transaction/verify/${reference}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${paystackSecret}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (data.status && data.data.status === 'success') {
          // Payment is verified
          setStatus('Payment verified! Setting up your enrollment...');
          
          const amountPaid = data.data.amount / 100; // Convert back from kobo

          // 1. Double check enrollment doesn't exist
          const { data: exist } = await supabase
            .from('enrollments')
            .select('*')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

          if (!exist) {
             // 2. Create the Enrollment
             await supabase.from('enrollments').insert([{
               user_id: userId,
               course_id: courseId,
               amount_paid: amountPaid
             }]);

             // 3. Create realistic payout for Instructor (taking 20% platform fee)
             const instructorAmount = amountPaid * 0.8;
             const { data: courseData } = await supabase
              .from('courses')
              .select('instructor_id')
              .eq('id', courseId)
              .single();

             if (courseData) {
               await supabase.from('payouts').insert([{
                 instructor_id: courseData.instructor_id,
                 amount: instructorAmount,
                 status: 'pending'
               }]);
             }
          }

          setStatus('Enrollment complete! Redirecting to your dashboard...');
          setTimeout(() => {
            navigate('/student/dashboard');
          }, 2000);

        } else {
          setStatus(`Payment verification failed: ${data.message || 'Unknown error'}`);
        }

      } catch (err) {
        console.error(err);
        setStatus('An error occurred while verifying the payment.');
      }
    };

    verifyTransaction();
  }, [searchParams, navigate]);

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-5 text-center" style={{maxWidth: '500px'}}>
        <div className="mb-4">
          <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <h4 className="mb-3">Processing Transaction</h4>
        <p className="text-muted mb-0">{status}</p>
      </div>
    </div>
  );
};

export default PaymentVerify;

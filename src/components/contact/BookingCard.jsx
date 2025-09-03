import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, LogIn } from 'lucide-react';
import useStore from '@/lib/store';

const BookingCard = ({ content }) => {
  const navigate = useNavigate();
  const user = useStore(state => state.user);
  const isAdmin = useStore(state => state.isAdmin);

  return (
    <Card className="custom-shadow border-0 bg-[var(--light-peach-bg)]/50 p-6 lg:p-8">
      <CardHeader className="p-0 mb-6">
        <div className="flex items-center gap-3 mb-2">
          {user ? <UserPlus className="h-8 w-8 text-[var(--vibrant-coral)]" strokeWidth={2} /> : <LogIn className="h-8 w-8 text-[var(--vibrant-coral)]" strokeWidth={2} />}
          <CardTitle className="text-2xl font-bold text-gray-800">{content.title}</CardTitle>
        </div>
        <p className="text-gray-600">
          {user ? content.loggedInSubtitle : content.subtitle}
        </p>
      </CardHeader>
      <CardContent className="p-0">
        {user ? (
          <Button 
            onClick={() => navigate(isAdmin ? '/admin' : '/dashboard')}
            className="w-full bg-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/90 text-white rounded-full py-3 text-lg font-semibold"
          >
            {content.goToDashboardButton}
          </Button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => navigate('/login')}
              className="flex-1 bg-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/90 text-white rounded-full py-3 text-lg font-semibold"
            >
              <LogIn className="mr-2 h-5 w-5 text-white" strokeWidth={2} />
              {content.loginButton}
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              variant="outline"
              className="flex-1 border-[var(--vibrant-coral)] text-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/10 rounded-full py-3 text-lg font-semibold"
            >
              <UserPlus className="mr-2 h-5 w-5 text-[var(--vibrant-coral)]" strokeWidth={2} />
              {content.registerButton}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCard;
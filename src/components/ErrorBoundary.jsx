
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-slate-100 text-center">
            <div className="bg-red-100 text-red-600 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
              <AlertTriangle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Algo deu errado</h2>
            <p className="text-slate-600 mb-6">
              A aplicação encontrou um erro inesperado ao carregar esta seção. 
            </p>
            
            {this.state.error && (
              <div className="bg-slate-100 p-4 rounded-lg text-left overflow-auto text-sm text-slate-700 mb-6 font-mono max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <Button onClick={this.handleRetry} className="w-full bg-primary hover:bg-[#5a8c39] flex items-center justify-center gap-2">
              <RefreshCw size={18} />
              Tentar Novamente
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

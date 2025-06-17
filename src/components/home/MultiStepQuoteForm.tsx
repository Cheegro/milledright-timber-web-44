import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  phone: z.string().optional(),
  projectType: z.string().min(1, {
    message: 'Please select a project type.'
  }),
  projectDetails: z.string().optional(),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.'
  })
});
type FormValues = z.infer<typeof formSchema>;
interface MultiStepQuoteFormProps {
  preSelectedProject?: string;
}
const MultiStepQuoteForm = ({
  preSelectedProject
}: MultiStepQuoteFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: preSelectedProject || '',
      projectDetails: '',
      message: ''
    }
  });
  const watchedProjectType = form.watch('projectType');
  const getProjectSpecificQuestions = (projectType: string) => {
    switch (projectType) {
      case 'mill-logs':
        return {
          label: 'Log Details',
          placeholder: 'Please describe your logs: quantity, species, approximate size/diameter, and any specific cuts you need...'
        };
      case 'custom-table':
        return {
          label: 'Table Specifications',
          placeholder: 'Desired dimensions (length x width x height), wood species preference, style requirements...'
        };
      case 'countertops':
        return {
          label: 'Countertop Details',
          placeholder: 'Kitchen/bathroom size, preferred wood species, edge style, thickness requirements...'
        };
      case 'furniture':
        return {
          label: 'Furniture Specifications',
          placeholder: 'Type of furniture, dimensions, wood preferences, style details...'
        };
      case 'flooring':
        return {
          label: 'Flooring Details',
          placeholder: 'Square footage, room type, wood species preference, plank width/style...'
        };
      default:
        return {
          label: 'Project Details',
          placeholder: 'Please describe your project requirements...'
        };
    }
  };
  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await form.trigger(['name', 'email', 'projectType']);
    } else if (currentStep === 2) {
      isValid = await form.trigger(['projectDetails']);
    }
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formsubmit.co/Lucas@Flamingfirewood.ca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          _subject: `New Quote Request: ${values.projectType}`,
          projectDetails: values.projectDetails || 'No specific details provided'
        })
      });
      if (response.ok) {
        console.log('Form submitted:', values);
        toast({
          title: "Quote request submitted!",
          description: "We'll get back to you within 24 hours."
        });
        form.reset();
        setCurrentStep(1);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission error",
        description: "There was a problem submitting your request. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const stepTitles = ["Basic Information", "Project Details", "Additional Information"];
  return <Card className="bg-white rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-sawmill-dark-brown text-zinc-950">
          Request a Quote - Step {currentStep} of 3
        </CardTitle>
        <div className="flex items-center space-x-2 mt-4 rounded-xl bg-amber-600 px-[61px] mx-[81px]">
          {[1, 2, 3].map(step => <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step < currentStep ? 'bg-green-500 text-white' : step === currentStep ? 'bg-sawmill-orange text-white' : 'bg-gray-200 text-gray-600'}`}>
                {step < currentStep ? <Check className="w-4 h-4" /> : step}
              </div>
              {step < 3 && <div className={`w-12 h-1 mx-2 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>)}
        </div>
        <p className="text-gray-600 mt-2 font-semibold text-base text-center">{stepTitles[currentStep - 1]}</p>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {currentStep === 1 && <div className="space-y-4">
                <FormField control={form.control} name="name" render={({
              field
            }) => <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={form.control} name="email" render={({
              field
            }) => <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={form.control} name="projectType" render={({
              field
            }) => <FormItem>
                      <FormLabel>Project Type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="What can we help you with?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mill-logs">Mill My Logs</SelectItem>
                          <SelectItem value="custom-table">Custom Table</SelectItem>
                          <SelectItem value="countertops">Countertops</SelectItem>
                          <SelectItem value="furniture">Custom Furniture</SelectItem>
                          <SelectItem value="flooring">Flooring</SelectItem>
                          <SelectItem value="other">Other Project</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>} />
              </div>}

            {currentStep === 2 && <div className="space-y-4">
                <FormField control={form.control} name="projectDetails" render={({
              field
            }) => <FormItem>
                      <FormLabel>{getProjectSpecificQuestions(watchedProjectType).label}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={getProjectSpecificQuestions(watchedProjectType).placeholder} className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                {watchedProjectType === 'mill-logs' && <div className="bg-blue-50 p-4 rounded-md">
                    <h4 className="font-medium text-blue-900 mb-2">Helpful Info for Log Milling:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Log species and quantity</li>
                      <li>• Approximate diameter and length</li>
                      <li>• Desired lumber thickness</li>
                      <li>• Any specific cuts or requirements</li>
                    </ul>
                  </div>}
              </div>}

            {currentStep === 3 && <div className="space-y-4">
                <FormField control={form.control} name="phone" render={({
              field
            }) => <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={form.control} name="message" render={({
              field
            }) => <FormItem>
                      <FormLabel>Additional Message *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about your timeline, budget range, or any other important details..." className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <div className="bg-green-50 p-4 rounded-md">
                  <h4 className="font-medium text-green-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• We'll review your request within 24 hours</li>
                    <li>• Lucas will contact you directly to discuss details</li>
                    <li>• We'll provide a detailed quote for your project</li>
                  </ul>
                </div>
              </div>}
            
            <div className="flex justify-between pt-4">
              {currentStep > 1 && <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>}
              
              {currentStep < 3 ? <Button type="button" onClick={nextStep} disabled={isSubmitting} className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown ml-auto text-zinc-50 bg-zinc-900 hover:bg-zinc-800">
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button> : <Button type="submit" className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown ml-auto" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                </Button>}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>;
};
export default MultiStepQuoteForm;
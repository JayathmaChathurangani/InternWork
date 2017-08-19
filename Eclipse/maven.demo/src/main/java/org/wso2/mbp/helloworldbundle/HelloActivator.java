package org.wso2.mbp.helloworldbundle;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceRegistration;


public class HelloActivator implements BundleActivator {
	
	ServiceRegistration firstServiceRegistration;

    public void start(BundleContext context) throws Exception {
        System.out.println("start buddhi I change it nowww ww");
        
        FirstServiceInterface firstService = new FirstServiceImpl();
        firstServiceRegistration = context.registerService(FirstServiceInterface.class.getName(), firstService, null);
    }

    public void stop(BundleContext context) throws Exception {
        
        firstServiceRegistration.unregister();
        System.out.println("stop buddhi");
    }
}
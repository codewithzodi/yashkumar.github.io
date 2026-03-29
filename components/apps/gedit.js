import React, { Component } from 'react';

export class Gedit extends Component {
    render() {
        const phone = "+91 8448918860";
        const email = "kumar.yash200430@gmail.com";
        const location = "Ghaziabad, UP, India";

        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#1e1e1e',
                fontFamily: 'Inter, sans-serif',
                overflow: 'hidden',
            }}>
                {/* Card */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '560px',
                    height: '280px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    background: '#2a2a2a',
                    border: '1px solid rgba(255,255,255,0.08)',
                }}>

                    {/* Left: Bitmoji Panel */}
                    <div style={{
                        width: '230px',
                        flexShrink: 0,
                        background: 'linear-gradient(160deg, #3a2a1a 0%, #2a1e10 100%)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Glow */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0, left: '50%',
                            transform: 'translateX(-50%)',
                            width: '180px', height: '180px',
                            background: 'radial-gradient(circle, rgba(233,84,32,0.3) 0%, transparent 70%)',
                            borderRadius: '50%',
                        }} />
                        <img
                            src="./images/logos/yash.png"
                            alt="Yash"
                            style={{
                                height: '300px',
                                width: 'auto',
                                objectFit: 'contain',
                                position: 'relative',
                                zIndex: 1,
                                filter: 'drop-shadow(0 -4px 20px rgba(233,84,32,0.2))',
                            }}
                        />
                    </div>

                    {/* Right: Info Panel */}
                    <div style={{
                        flex: 1,
                        padding: '28px 30px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '20px',
                    }}>
                        {/* Name & Title */}
                        <div>
                            <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>Yash Kumar</div>
                            <div style={{ fontSize: '11px', color: '#e95420', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '5px' }}>
                                Python Developer | Cloud & Cybersecurity Enthusiast
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', width: '100%' }} />

                        {/* Contact Rows */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                            {/* WhatsApp */}
                            <a href={`https://wa.me/${phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                                <div style={{
                                    width: '34px', height: '34px', borderRadius: '10px',
                                    background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>
                                    <svg width="17" height="17" fill="#25D366" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '9px', color: '#888', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>WhatsApp</div>
                                    <div style={{ fontSize: '13px', color: '#e8e8e8', fontWeight: 500, marginTop: '1px' }}>{phone}</div>
                                </div>
                            </a>

                            {/* Email */}
                            <a href={`mailto:${email}`}
                                style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                                <div style={{
                                    width: '34px', height: '34px', borderRadius: '10px',
                                    background: 'rgba(234,67,53,0.1)', border: '1px solid rgba(234,67,53,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>
                                    <svg width="17" height="17" fill="#EA4335" viewBox="0 0 24 24">
                                        <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.65 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.075 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '9px', color: '#888', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Email</div>
                                    <div style={{ fontSize: '13px', color: '#e8e8e8', fontWeight: 500, marginTop: '1px' }}>{email}</div>
                                </div>
                            </a>

                            {/* Location */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '34px', height: '34px', borderRadius: '10px',
                                    background: 'rgba(66,133,244,0.1)', border: '1px solid rgba(66,133,244,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>
                                    <svg width="17" height="17" fill="#4285F4" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '9px', color: '#888', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Location</div>
                                    <div style={{ fontSize: '13px', color: '#e8e8e8', fontWeight: 500, marginTop: '1px' }}>{location}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Gedit;

export const displayGedit = () => {
    return <Gedit />;
}
